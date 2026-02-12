const Footer = () => {
    return (
        <footer className="py-8 bg-[#030014] border-t border-white/5">
            <div className="container px-6">
                <div className="text-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Prafull Designs. Made with <span className="text-pink-500">❤️</span> in Nepal.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
