
const Footer = () => {
    const date = new Date().getFullYear();
    return (
        <footer className="p-10 border border-zinc-700 rounded-md">
            <div className="">
                <p className="text-sm">{date} Note: App Is Just for Demo Purposes!</p>
            </div>
        </footer>
    )
}
export default Footer;