import './miniNav.css'
import ArrowUp from '../../assets/arrowUp.svg'
function MiniNav({children}){
    const scrollToTop = () => {
        const container = document.querySelector('.conteiner-parcial');
        if (container) {
            container.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
        }
    };
    
    return(
        <div className="miniNav">
        <ul>
          {children}
          <li 
            title='Ir al principio'
            onClick={scrollToTop}
            className='btn-add'
            ><img src={ArrowUp} alt='Ir al principio'/></li>
        </ul>
      </div>
    )
}

export default MiniNav;