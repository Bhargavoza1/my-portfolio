"use client"
// The "live 3D" replay frame: top bar, three.js scene, HUD, timeline and toggles.
// Loads the rollout JSON only when the frame comes on screen. Falls back to the
// recorded video when there is no WebGL or the file fails to load.
import dynamic from "next/dynamic"
import {useCallback, useEffect, useRef, useState} from "react"
import {b64bytes, type Rollout, type ViewState} from "./ReplayScene"

const ReplayScene = dynamic(() => import("./ReplayScene"), {ssr: false})

type Props = {
    src: string            // e.g. /rollouts/h1_walk.json
    label: string          // top bar text, e.g. "replay · h1_walk · ckpt 600"
    fallbackVideo?: string // without extension: .webm and .mp4 are tried
    poster?: string
    height?: string        // tailwind height classes
}

function hasWebGL() {
    try {
        const c = document.createElement("canvas")
        return !!(c.getContext("webgl2") || c.getContext("webgl"))
    } catch { return false }
}

export default function ReplayViewer({src, label, fallbackVideo, poster, height = "h-[360px] md:h-[440px]"}: Props) {
    const box = useRef<HTMLDivElement>(null)
    const [r, setR] = useState<Rollout | null>(null)
    const [failed, setFailed] = useState(false)
    const [playing, setPlaying] = useState(true)
    const [ui, setUi] = useState({ghost: true, heat: false, follow: false})
    const [hud, setHud] = useState({t: 0, falls: 0, speed: 0, frame: 0})
    const view = useRef<ViewState>({frame: 0, ghost: true, heat: false, follow: false})

    useEffect(() => { Object.assign(view.current, ui) }, [ui])

    // load when visible
    useEffect(() => {
        if (!hasWebGL()) { setFailed(true); return }
        const el = box.current
        if (!el) return
        const io = new IntersectionObserver(async ([e]) => {
            if (!e.isIntersecting) return
            io.disconnect()
            try {
                const res = await fetch(src)
                if (!res.ok) throw new Error(String(res.status))
                const j = await res.json()
                const f32 = (s: string) => new Float32Array(b64bytes(s))
                setR({
                    ...j, frames: f32(j.frames), ghost: f32(j.ghost), error: f32(j.error),
                    hud: {t: f32(j.hud.t), falls: f32(j.hud.falls), speed: f32(j.hud.speed)},
                })
            } catch { setFailed(true) }
        }, {rootMargin: "200px"})
        io.observe(el)
        return () => io.disconnect()
    }, [src])

    // player clock
    useEffect(() => {
        if (!r) return
        let raf = 0, prev = performance.now(), lastHud = 0
        const tick = (now: number) => {
            const dt = Math.max(0, Math.min(0.1, (now - prev) / 1000))  // rAF time can be a bit before prev
            prev = now
            if (playing) view.current.frame = (view.current.frame + dt * r.fps) % r.nframes
            if (now - lastHud > 100) {
                lastHud = now
                const f = Math.min(r.nframes - 1, Math.max(0, Math.floor(view.current.frame)))
                setHud({t: r.hud.t[f], falls: r.hud.falls[f], speed: r.hud.speed[f], frame: f})
            }
            raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [r, playing])

    const seek = useCallback((f: number) => {
        view.current.frame = f
        if (r) setHud({t: r.hud.t[f], falls: r.hud.falls[f], speed: r.hud.speed[f], frame: f})
    }, [r])

    const toggle = (k: keyof typeof ui) => setUi(u => ({...u, [k]: !u[k]}))
    const chip = (on: boolean) =>
        `rounded-[3px] border px-2 py-1 font-mono text-[11px] ${on ? "border-white/70 bg-white/10 text-white" : "border-white/20 text-white/55 hover:text-white"}`

    return (
        <div ref={box} className="overflow-hidden rounded-[6px] border border-[#2b2f37] bg-screen text-white">
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                <span className="font-mono text-[11px] text-white/70">{label}</span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-white/70">
                    <span className={`h-1.5 w-1.5 rounded-full ${failed ? "bg-white/40" : "bg-live"}`}/>
                    {failed ? "video" : "live 3D"}
                </span>
            </div>

            <div className={`relative ${height}`}>
                {failed ? (
                    fallbackVideo ? (
                        <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster={poster}>
                            <source src={`${fallbackVideo}.webm`} type="video/webm"/>
                            <source src={`${fallbackVideo}.mp4`} type="video/mp4"/>
                        </video>
                    ) : <div className="flex h-full items-center justify-center font-mono text-xs text-white/50">3D view not available</div>
                ) : r ? (
                    <ReplayScene r={r} view={view}/>
                ) : (
                    <div className="flex h-full items-center justify-center font-mono text-xs text-white/50"
                         style={poster ? {backgroundImage: `url(${poster})`, backgroundSize: "cover", backgroundPosition: "center"} : {}}>
                        <span className="rounded bg-black/50 px-2 py-1">loading rollout…</span>
                    </div>
                )}

                {r && !failed && (
                    <div className="pointer-events-none absolute left-3 top-3 rounded-[4px] border border-white/15 bg-black/45 px-3 py-2 font-mono text-[11px] leading-5 text-white/85">
                        <div>t&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{hud.t.toFixed(1)} s</div>
                        <div>falls&nbsp;{hud.falls.toFixed(0)}</div>
                        <div>speed&nbsp;{hud.speed.toFixed(2)} m/s</div>
                    </div>
                )}
                {r && !failed && ui.heat && (
                    <div className="pointer-events-none absolute right-3 top-3 rounded-[4px] border border-white/15 bg-black/45 px-3 py-2 font-mono text-[10px] text-white/80">
                        <div className="mb-1">tracking error</div>
                        <div className="h-1.5 w-28 rounded-full" style={{background: "linear-gradient(to right,#2fb67c,#d8453b)"}}/>
                        <div className="mt-1 flex justify-between"><span>0</span><span>{r.error_red} m</span></div>
                    </div>
                )}
            </div>

            {r && !failed && (
                <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-3 py-2">
                    <button className={chip(true)} onClick={() => setPlaying(p => !p)}>{playing ? "pause" : "play"}</button>
                    <input type="range" min={0} max={r.nframes - 1} value={hud.frame} aria-label="timeline"
                           onChange={e => seek(Number(e.target.value))}
                           className="h-1 min-w-[120px] flex-1 cursor-pointer accent-white"/>
                    <button className={chip(ui.ghost)} onClick={() => toggle("ghost")}>ghost</button>
                    <button className={chip(ui.heat)} onClick={() => toggle("heat")}>heatmap</button>
                    <button className={chip(ui.follow)} onClick={() => toggle("follow")}>cam</button>
                </div>
            )}
        </div>
    )
}
