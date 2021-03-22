import Link from 'next/link';

import { Container, Author, BorderCustom, SocialNetworking, Discord, FooterContainer, ProjectThis } from './styles';

const Footer: React.FC = () => {
  return (
    <>
      <BorderCustom />
      <Container>
        <ProjectThis>
          <Author>Desenvolvido por <a href="https://smcodes.tk">SMCodes</a></Author>
        </ProjectThis>
        <FooterContainer>
          <Author>Feito com <span>❤️</span> por OtakuCity</Author>
        </FooterContainer>
        <SocialNetworking>
          <Link href="https://discord.gg/SDYmjZG89B">
            <a>
              <Discord
                title="Link para nosso discord"
              />
            </a>
          </Link>
        </SocialNetworking>
      </Container>
    </>
  );
}

export default Footer;