import { SnowflakeIcon } from 'lucide-react'

const Loading = () => {
    return (
        <div className='min-h-screen'>
            <div className='absolute top-1/2 left-1/2 z-50 animate-ping'>
                <SnowflakeIcon size={50} color='#308fc7' />
            </div>
        </div>
    )
}

export default Loading