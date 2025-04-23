import LoginForm from '../../components/LoginForm/LoginForm';
import Container from '../../ui/Container/Container';
import css from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <section className={css.section}>
      <Container className={css.container}>
        <LoginForm />
      </Container>
    </section>
  );
}
