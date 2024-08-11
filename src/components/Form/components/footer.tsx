import Link from "next/link"
interface FooterProps {
    descripcion: string
    textLink: string
    link: string
}

export function Footer({ descripcion, textLink, link }: FooterProps) {

    return (
        <div className='w-full flex justify-center mt-3'>
            <span className='text-[12px]'>
                {descripcion}{''}
                <Link href={link} className='font-bold'>
                    {textLink}
                </Link>
            </span>
        </div>
    )

}