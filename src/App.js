import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  VStack,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Home from './Home';
import ProjectDetail from './ProjectDetail';

function App() {
  const pageBg = 'black';
  const textColor = 'white';
  const accentColor = 'black';

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isOpen: isMobileNavOpen, onToggle: onMobileNavToggle, onClose: onMobileNavClose } = useDisclosure();

  const navigate = useNavigate();
  const location = useLocation();

  // Handle smooth navigation to anchor sections across pages
  const handleNavClick = (e, href) => {
    e.preventDefault();
    onMobileNavClose();

    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    document.title = 'Ferly Mae De Mesa | Portfolio';

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Keep navbar visible at top, or show when scrolling up
      if (currentScrollY <= 20 || currentScrollY < lastScrollY) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Projects', href: '#projects' },
    { name: 'TechStack', href: '#techstack' },
  ];

  return (
    <Box bg={pageBg} color={textColor} minH="100vh" pt={24}>
      {/* Dynamic Aesthetic Header */}
      <Box
        as="header"
        position="fixed"
        top={5}
        left="50%"
        transform={
          showNavbar
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(-150%)'
        }
        transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        zIndex={50}
        w="92%"
        maxW="6xl"
      >
        {/* Soft Ambient Backdrop Glow */}
        <Box
          position="absolute"
          inset="-1px"
          bgGradient="linear(to-r, cyan.500/20, purple.500/20)"
          borderRadius={isMobileNavOpen ? '2xl' : 'full'}
          filter="blur(12px)"
          opacity={0.6}
          pointerEvents="none"
          transition="all 0.3s ease"
        />

        {/* Header Capsule Bar */}
        <Box
          position="relative"
          py={3}
          px={{ base: 5, md: 8 }}
          bg="rgba(10, 15, 26, 0.75)"
          backdropFilter="blur(20px) saturate(180%)"
          borderRadius={isMobileNavOpen ? '2xl' : 'full'}
          border="1px solid"
          borderColor="rgba(255, 255, 255, 0.12)"
          boxShadow="0 20px 40px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)"
          transition="all 0.3s ease"
        >
          <Flex align="center" justify="space-between">
            {/* Aesthetic Logo / Branding */}
            <HStack spacing={2.5} cursor="pointer" onClick={(e) => handleNavClick(e, '#')}>
              <Box
                boxSize="8px"
                borderRadius="full"
                bg="cyan.400"
                boxShadow="0 0 10px #38bdf8"
              />
              <Heading
                size="sm"
                letterSpacing="widest"
                textTransform="uppercase"
                fontWeight="bold"
                bgGradient="linear(to-r, white, gray.300)"
                bgClip="text"
              >
                Portfolio
              </Heading>
            </HStack>

            {/* Desktop Navigation Links */}
            <HStack
              spacing={{ base: 2, md: 4, lg: 6 }}
              display={{ base: 'none', md: 'flex' }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  fontSize="xs"
                  fontWeight="medium"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  color="gray.300"
                  px={3}
                  py={1.5}
                  borderRadius="full"
                  transition="all 0.25s ease"
                  _hover={{
                    textDecoration: 'none',
                    color: 'cyan.300',
                    bg: 'rgba(56, 189, 248, 0.08)',
                    textShadow: '0 0 8px rgba(56, 189, 248, 0.5)',
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </HStack>

            {/* Right Group: Contact Action & Mobile Toggle */}
            <HStack spacing={3}>
              <Link
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                fontSize="xs"
                fontWeight="semibold"
                letterSpacing="wider"
                textTransform="uppercase"
                color="white"
                px={4}
                py={2}
                borderRadius="full"
                bg="rgba(255, 255, 255, 0.08)"
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.15)"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  textDecoration: 'none',
                  bg: 'cyan.400',
                  color: 'black',
                  borderColor: 'cyan.300',
                  boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)',
                  transform: 'translateY(-1px)',
                }}
              >
                Contact
              </Link>

              {/* Mobile Menu Button */}
              <IconButton
                aria-label="Toggle navigation"
                icon={isMobileNavOpen ? <FaTimes /> : <FaBars />}
                size="sm"
                variant="ghost"
                color="white"
                display={{ base: 'flex', md: 'none' }}
                onClick={onMobileNavToggle}
                _hover={{ bg: 'whiteAlpha.200' }}
              />
            </HStack>
          </Flex>

          {/* Mobile Collapsible Navigation */}
          <Collapse in={isMobileNavOpen} animateOpacity>
            <VStack
              spacing={3}
              pt={4}
              pb={2}
              align="stretch"
              display={{ base: 'flex', md: 'none' }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  fontSize="xs"
                  fontWeight="medium"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  color="gray.300"
                  py={2}
                  px={3}
                  borderRadius="md"
                  _hover={{
                    textDecoration: 'none',
                    color: 'cyan.300',
                    bg: 'rgba(56, 189, 248, 0.08)',
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </VStack>
          </Collapse>
        </Box>
      </Box>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:projectSlug" element={<ProjectDetail />} />
      </Routes>

      {/* Footer Section */}
      <Box id="contact" as="footer" bg={accentColor} color="white" py={16} mt={12}>
        <Container maxW="7xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="start"
            gap={10}
            mb={12}
          >
            <Stack spacing={4}>
              <Box>
                <Heading size="md" letterSpacing="wider" textTransform="uppercase">
                  Ferly Mae Valero de Mesa
                </Heading>
                <Text fontSize="sm" opacity={0.8}>
                  UI/UX Designer | Front End Developer
                </Text>
              </Box>
              <Text fontSize="md" maxW="300px">
                Building user-centered systems and digital solutions.
              </Text>
            </Stack>

            <Stack spacing={3} align="flex-start">
              <Heading size="sm" letterSpacing="wider" textTransform="uppercase" mb={1}>
                Contacts
              </Heading>
              <HStack spacing={3}>
                <FaEnvelope size="14px" />
                <Link href="mailto:demesaferlymae@gmail.com" fontSize="sm">
                  demesaferlymae@gmail.com
                </Link>
              </HStack>
              <HStack spacing={3}>
                <FaGithub size="14px" />
                <Link href="https://github.com/expiredflurry" isExternal fontSize="sm">
                  github.com/expiredflurry
                </Link>
              </HStack>
              <HStack spacing={3}>
                <FaLinkedin size="14px" />
                <Link
                  href="https://linkedin.com/in/ferly-mae-de-mesa-7bb42339a"
                  isExternal
                  fontSize="sm"
                >
                  linkedin.com/in/ferly-mae-de-mesa
                </Link>
              </HStack>
            </Stack>
          </Flex>

          <Box borderTop="1px solid" borderColor="whiteAlpha.400" pt={8}>
            <Text textAlign="center" fontSize="sm" opacity={0.9}>
              © 2026 All rights reserved.
            </Text>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default App;