import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import Container from './../../ui/Container/Container';
import css from './RegisterPage.module.css';

export default function RegisterPage() {
  return (
    // <div className={css.registerPage}>
    <section className={css.section}>
      <Container className={css.container}>
        <RegistrationForm />
      </Container>
    </section>
    // </div>
  );
}
