import { useProgress } from "@react-three/drei"

export default function LoadingScreen () {
    const { progress } = useProgress()

    return <>
        <div className="loadingScreen">
            <div className="loadingScreen__progress">
                <div
                    className="loadingScreen__progress_value"
                    style={{
                        width: `${progress}%`,
                    }}
                ></div>
            </div>
                <div className="loadingScreen__board">
                    <h1 className="loadingScreen__title">Click to begin</h1>
                    <button className="loadingScreen__button" disabled={progress < 100}>
                        Start
                    </button>
                </div>
        </div>

    </>
}