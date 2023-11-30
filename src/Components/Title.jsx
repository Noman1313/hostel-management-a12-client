

const Title = ({heading, subHeading}) => {
    return (
        <div className="my-5">
            <h3 className="text-3xl text-center my-6 font-semibold">{heading}</h3>
            <p className="text-center text-zinc-950">{subHeading}</p>
        </div>
    );
};

export default Title;