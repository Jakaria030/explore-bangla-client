
const NewsLetter = () => {
    return (
        <section className="max-w-8xl mx-auto px-5">
            <div className="flex flex-col items-center justify-center bg-teal p-10 space-y-5">
                <div>
                <h2 className="text-2xl font-bold text-white text-center">Join Our Newsletter</h2>
                <p className="text-lg font-medium text-white text-center">To reciev our beast deals</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0">
                    <input
                        type="text"
                        placeholder="Enter Your Email"
                        className="outline-none px-4 py-2 rounded-none " />
                    <button className="px-4 py-2 bg-orange text-white">Subscribe</button>
                </div>
            </div>
        </section>
    );
};

export default NewsLetter;