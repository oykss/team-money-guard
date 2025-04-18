import { IoExitOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import logoSvg from '../../assets/logo.svg';
import Container from '../../ui/Container/Container';
import { ROUTES } from './../../constants/index';
import { useMediaPoints } from './../../hooks/useMediaPoints';
import css from './Header.module.css';

export default function Header() {
  const { isMobile } = useMediaPoints();

  return (
    <header className={css.header}>
      <Container className={css.container}>
        <Link to={ROUTES.HOME}>
          <img src={logoSvg} alt="Logo" />
        </Link>

        <div className={css.infoWrap}>
          <p className={css.name}>Name</p>
          <button type="button">
            <IoExitOutline color="#ffffff99" size={24} />
            {!isMobile && <p>Exit</p>}
          </button>
        </div>
      </Container>
    </header>
  );
}
