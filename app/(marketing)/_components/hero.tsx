import Image from 'next/image'
const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
                    <Image
                        className='object-contain dark:hidden'
                        src='/documents.png'
                        alt='documents'
                        fill
                    />
                    <Image
                        className='object-contain hidden dark:block'
                        src='/documents-dark.png'
                        alt='documents'
                        fill
                    />

                </div>
                <div className='relative w-[400px] h-[400px] hidden md:block'>
                    <Image
                        className='object-contain dark:hidden'
                        src='/reading.png'
                        alt='reading'
                        fill
                    />
                    <Image
                        className='object-contain hidden dark:block'
                        src='/reading-dark.png'
                        alt='reading'
                        fill
                    />
                </div>
            </div>
        </div>
    );
}

export default Hero;