import GuestOnly from "./(auth)/GuestOnly";
import Login from "./(auth)/login";

const Home = () => {
  return (
    <GuestOnly>
      <Login />
    </GuestOnly>
  );
};

export default Home;
