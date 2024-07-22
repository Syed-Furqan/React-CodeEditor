import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <div className={`h-[50px] bg-[#282828] w-[100%] border-b-[0.2px] border-[#474747] flex items-center pl-4 pr-4 pt-2 pb-2`}> 
            <div className="text-[24px] text-[white] font-[Pacifico]">React Editor</div>
        </div>
    );
}

export default Navbar;