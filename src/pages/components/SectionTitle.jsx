
const SectionTitle = ({title}) => {
    return (
        <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-charcoal text-center capitalize">{title}</h1>
            <div className='w-32 h-[2px] bg-teal mx-auto'></div>
        </div>
    );
};

export default SectionTitle;