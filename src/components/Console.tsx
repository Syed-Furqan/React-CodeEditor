type ConsoleProps = {
    logs: any[]
}

const Console: React.FC<ConsoleProps> = ({ logs }) => {
    return (
        <div className="w-[100%] h-[100%]">
            {logs.map((log, index) => (
                <div key={index}>{log}</div>
            ))}
        </div>
    )
}

export default Console;