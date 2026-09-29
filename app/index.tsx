import { useRef } from "react";

import {
  Image,
  ImageSourcePropType,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { Asset } from "expo-asset";
import * as Sharing from "expo-sharing";

type Project = {
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  highlight?: string;
  image: ImageSourcePropType;
  technologies: string[];
  url: string;
  isBatPass?: boolean;

  demo?: {
    user?: string;
    email: string;
    password: string;
  };
};

const COLORS = {
  background: "#07070B",
  surface: "#101018",
  surfacePurple: "#15111F",

  border: "#272735",
  borderSoft: "#1D1D29",
  borderPurple: "#3D2A58",

  primary: "#8B5CF6",
  primaryStrong: "#7C3AED",
  primarySoft: "#A78BFA",
  primaryLight: "#C4B5FD",

  blue: "#818CF8",

  white: "#FAFAFC",
  text: "#E7E7ED",
  muted: "#A0A0AE",
  mutedDark: "#70707E",
};

const skills = [
  {
    number: "01",
    title: "Front-end",
    description:
      "Interfaces modernas, responsivas e orientadas à experiência.",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Vite",
      "Tailwind CSS",
    ],
  },
  {
    number: "02",
    title: "Mobile",
    description:
      "Aplicações pensadas para experiências móveis fluidas.",
    items: ["React Native", "Expo", "Expo Router", "AsyncStorage"],
  },
  {
    number: "03",
    title: "Back-end & Dados",
    description:
      "Conhecimentos para compreender aplicações de ponta a ponta.",
    items: [
      "Node.js",
      "Fastify",
      "Java",
      "Spring Boot",
      "Python",
      "SQLite",
      "PostgreSQL",
      "Prisma",
      "API REST",
    ],
  },
  {
    number: "04",
    title: "Ferramentas",
    description:
      "Tecnologias que fazem parte do meu fluxo de desenvolvimento.",
    items: ["Git", "GitHub", "Postman", "VS Code"],
  },
];

const projects: Project[] = [
  {
    number: "01",
    title: "SynerRH Web",
    subtitle: "Gestão e desenvolvimento de pessoas",
    category: "FULL STACK",

    description:
      "Sistema de gestão de pessoas que centraliza colaboradores, avaliações, PDIs, feedbacks, ciclos e indicadores em um único ambiente.",

    highlight:
      "Um projeto que conecta minha experiência com processos e gestão ao desenvolvimento de software.",

    image: require("../assets/projects/synerrh-web.jpg"),

    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Node.js",
      "Fastify",
      "Prisma",
      "PostgreSQL",
    ],

    url: "https://synerrh-frontend.onrender.com/",
  },

  {
    number: "02",
    title: "Fleet Management System",
    subtitle: "Gestão e controle de frotas corporativas",
    category: "FULL STACK",

    description:
      "Sistema para gerenciamento de veículos, motoristas, manutenções, ordens de serviço, contratos, custos e indicadores operacionais.",

    highlight:
      "Inspirado em processos reais da minha experiência profissional com rotinas administrativas, manutenção e gestão de frotas.",

    image: require("../assets/projects/fleet-management.png"),

    technologies: [
      "React",
      "JavaScript",
      "Node.js",
      "Fastify",
      "SQLite",
      "JWT",
    ],

    url: "https://nataliapastre-dev.github.io/fleet-management-system/",

    demo: {
      user: "Administrador Demo",
      email: "admin@fleet.com",
      password: "123456",
    },
  },

  {
    number: "03",
    title: "SynerRH Mobile",
    subtitle: "Gestão de pessoas na palma da mão",
    category: "MOBILE",

    description:
      "Meu primeiro aplicativo mobile, criado a partir da evolução do SynerRH Web. Leva colaboradores, avaliações, PDIs, feedbacks e indicadores para uma experiência pensada para dispositivos móveis.",

    highlight:
      "Uma evolução do ecossistema SynerRH, levando a experiência de gestão de pessoas também para o mobile.",

    image: require("../assets/projects/synerrh-mobile.png"),

    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "AsyncStorage",
      "API REST",
    ],

    url: "https://synerrh-mobile.onrender.com/",
  },

  {
    number: "04",
    title: "PlanejaAI",
    subtitle: "Planejamento financeiro transformado em informação",
    category: "WEB",

    description:
      "Aplicação para organizar renda, despesas e objetivos financeiros, oferecendo uma visão estruturada do orçamento e apoiando o planejamento pessoal.",

    highlight:
      "Une planejamento, organização, análise de dados e minha experiência administrativa.",

    image: require("../assets/projects/planeja-ai.png"),

    technologies: ["HTML5", "CSS3", "JavaScript", "Python", "API"],

    url: "https://nataliapastre-dev.github.io/planeja-ai/",
  },

  {
    number: "05",
    title: "BatPass Mobile",
    subtitle: "Gerador de senhas seguras e personalizadas",
    category: "MOBILE",

    description:
      "Aplicação para criação de senhas fortes e personalizadas, com escolha de tamanho, tipos de caracteres, nível de segurança e cópia rápida da senha gerada.",

    highlight:
      "Projeto mobile com identidade visual própria, foco em experiência do usuário e geração rápida de senhas personalizadas.",

    image: require("../assets/projects/batpass.png"),

    isBatPass: true,

    technologies: ["React Native", "Expo", "TypeScript"],

    url: "https://batpass-mobile.onrender.com/",
  },

  {
    number: "06",
    title: "Burguer House",
    subtitle: "Landing page responsiva para hamburgueria",
    category: "FRONT-END",

    description:
      "Landing page fictícia desenvolvida com foco em identidade visual, responsividade, organização de conteúdo e experiência do usuário.",

    highlight:
      "Projeto voltado à construção de interfaces visualmente atraentes e adaptadas para diferentes tamanhos de tela.",

    image: require("../assets/projects/burguerhouse-website.png"),

    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
    ],

    url: "https://nataliapastre-dev.github.io/burguerhouse-website/",
  },

  {
    number: "07",
    title: "SIGECON",
    subtitle:
      "Sistema Inteligente de Gestão de Contratos e Indicadores",
    category: "FRONT-END",

    description:
      "Sistema corporativo para gestão de contratos, fornecedores, vencimentos e indicadores estratégicos, com dashboards, gráficos e relatórios.",

    highlight:
      "Projeto que conecta experiência administrativa, regras de negócio e desenvolvimento Front-end.",

    image: require("../assets/projects/sigecon.png"),

    technologies: [
      "React",
      "Vite",
      "JavaScript",
      "React Router",
      "Recharts",
      "CSS3",
    ],

    url: "https://nataliapastre-dev.github.io/SIGICON-Sistema-de-Gest-o-de-Contratos/#/login",

    demo: {
      email: "admin@sigecon.com",
      password: "123456",
    },
  },
];

const journey = [
  {
    number: "01",
    label: "BASE PROFISSIONAL",
    title: "Administração & Gestão",

    text:
      "Formação em Administração, pós-graduação em Gestão Empresarial e mais de 10 anos de experiência administrativa. Uma trajetória que desenvolveu minha visão sobre processos, organização, dados, pessoas e necessidades reais de negócio.",
  },

  {
    number: "02",
    label: "NOVO CAMINHO",
    title: "Transição para Tecnologia",

    text:
      "O interesse por soluções digitais se transformou em uma nova direção profissional. Na programação encontrei uma forma de unir raciocínio lógico, criatividade, organização e resolução de problemas.",
  },

  {
    number: "03",
    label: "FORMAÇÃO",
    title: "Análise e Desenvolvimento de Sistemas",

    text:
      "Graduação em andamento, com conclusão prevista para dezembro de 2026, ampliando meus conhecimentos em desenvolvimento web e mobile, programação, APIs, arquitetura de aplicações e banco de dados.",
  },

  {
    number: "04",
    label: "DESENVOLVIMENTO TÉCNICO",
    title: "Front-end & Mobile",

    text:
      "React, TypeScript, React Native e Expo se tornaram parte central da minha jornada, acompanhados por conhecimentos de back-end e dados para compreender o funcionamento das aplicações de ponta a ponta.",
  },

  {
    number: "05",
    label: "MOMENTO ATUAL",
    title: "Projetos que saem do papel",

    text:
      "Hoje transformo aprendizado em aplicações web e mobile cada vez mais completas, conectando desenvolvimento de software à minha experiência profissional, visão de negócio e vontade de construir soluções úteis.",
  },
];

export default function Home() {
  const scrollViewRef = useRef<ScrollView>(null);

  const sobreY = useRef(0);
  const projetosY = useRef(0);

  const { width } = useWindowDimensions();

  const isMobile = width < 720;
  const isSmallMobile = width < 390;

  const abrirLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log("Não foi possível abrir o link:", error);
    }
  };

  const baixarCurriculo = async () => {
    try {
      /*
       * WEB
       * Arquivo:
       * public/Natalia_Baptista_Pastre_CV.pdf
       */
      if (
        Platform.OS === "web" &&
        typeof document !== "undefined"
      ) {
        const link = document.createElement("a");

        link.href = "/Natalia_Baptista_Pastre_CV.pdf";
        link.download = "Natalia_Baptista_Pastre_CV.pdf";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return;
      }

      /*
       * EXPO GO / MOBILE
       * Arquivo:
       * assets/Natalia_Baptista_Pastre_CV.pdf
       */
      const asset = Asset.fromModule(
        require("../assets/Natalia_Baptista_Pastre_CV.pdf")
      );

      await asset.downloadAsync();

      const uri = asset.localUri ?? asset.uri;

      if (!uri) {
        console.log("Não foi possível localizar o currículo.");
        return;
      }

      const sharingAvailable =
        await Sharing.isAvailableAsync();

      if (!sharingAvailable) {
        console.log(
          "Compartilhamento não disponível neste dispositivo."
        );
        return;
      }

      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: "Currículo - Natália Baptista Pastre",
        UTI: "com.adobe.pdf",
      });
    } catch (error) {
      console.log("Erro ao abrir o currículo:", error);
    }
  };

  const scrollTo = (position: number) => {
    scrollViewRef.current?.scrollTo({
      y: Math.max(position - 20, 0),
      animated: true,
    });
  };

  const DemoAccess = ({
    user,
    email,
    password,
  }: {
    user?: string;
    email: string;
    password: string;
  }) => (
    <View style={styles.demoBox}>
      <View style={styles.demoHeading}>
        <View style={styles.demoDot} />

        <Text style={styles.demoHeadingText}>
          ACESSO PARA DEMONSTRAÇÃO
        </Text>
      </View>

      {user && (
        <View style={styles.demoRow}>
          <Text style={styles.demoLabel}>
            Usuário
          </Text>

          <Text style={styles.demoValue}>
            {user}
          </Text>
        </View>
      )}

      <View style={styles.demoRow}>
        <Text style={styles.demoLabel}>
          E-mail
        </Text>

        <Text style={styles.demoValue}>
          {email}
        </Text>
      </View>

      <View style={styles.demoRow}>
        <Text style={styles.demoLabel}>
          Senha
        </Text>

        <Text style={styles.demoValue}>
          {password}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          isMobile && styles.contentMobile,
        ]}
      >
        {/* =================================================
            HERO
        ================================================= */}

        <View
          style={[
            styles.hero,
            isMobile && styles.heroMobile,
          ]}
        >
          <View style={styles.heroGlowOne} />
          <View style={styles.heroGlowTwo} />
          <View style={styles.heroGlowThree} />

          <View style={styles.badge}>
            <View style={styles.badgeDot} />

            <Text style={styles.badgeText}>
              FRONT-END • MOBILE • TECNOLOGIA
            </Text>
          </View>

          <Text style={styles.hello}>
            Olá! Eu sou
          </Text>

          <Text
            style={[
              styles.name,
              isMobile && styles.nameMobile,
              isSmallMobile && styles.nameSmallMobile,
            ]}
          >
            Natália Baptista{" "}
            <Text style={styles.nameHighlight}>
              Pastre
            </Text>
          </Text>

          <Text
            style={[
              styles.role,
              isMobile && styles.roleMobile,
            ]}
          >
            Desenvolvedora{" "}
            <Text style={styles.roleHighlight}>
              Front-end & Mobile
            </Text>
          </Text>

          <Text
            style={[
              styles.heroDescription,
              isMobile && styles.heroDescriptionMobile,
            ]}
          >
            Transformo ideias, processos e necessidades reais em
            experiências digitais modernas, responsivas e funcionais.
          </Text>

          <Text style={styles.heroDescriptionSecondary}>
            Uma jornada que conecta mais de uma década de experiência
            profissional, visão de negócio e desenvolvimento de software.
          </Text>

          <View
            style={[
              styles.heroActions,
              isMobile && styles.heroActionsMobile,
            ]}
          >
            <Pressable
              onPress={() => scrollTo(projetosY.current)}
              style={({ pressed }) => [
                styles.primaryButton,
                isMobile && styles.heroButtonMobile,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>
                Explorar projetos
              </Text>

              <Text style={styles.buttonArrow}>
                ↓
              </Text>
            </Pressable>

            <Pressable
              onPress={() => scrollTo(sobreY.current)}
              style={({ pressed }) => [
                styles.secondaryButton,
                isMobile && styles.heroButtonMobile,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.secondaryButtonText}>
                Minha trajetória
              </Text>
            </Pressable>

            <Pressable
              onPress={baixarCurriculo}
              style={({ pressed }) => [
                styles.resumeButton,
                isMobile && styles.heroButtonMobile,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.resumeIcon}>
                ↓
              </Text>

              <Text style={styles.resumeButtonText}>
                Baixar currículo
              </Text>
            </Pressable>
          </View>

          <View style={styles.heroDetail}>
            <View style={styles.heroDetailLine} />

            <Text style={styles.heroDetailText}>
              PORTFÓLIO • 2026
            </Text>
          </View>
        </View>

        {/* =================================================
            TECNOLOGIAS
        ================================================= */}

        <View style={styles.section}>
          <View style={styles.sectionMarker}>
            <View style={styles.sectionMarkerLine} />

            <Text style={styles.sectionEyebrow}>
              TECNOLOGIAS
            </Text>
          </View>

          <Text
            style={[
              styles.sectionTitle,
              isMobile && styles.sectionTitleMobile,
            ]}
          >
            Tecnologias que fazem parte da minha jornada
          </Text>

          <Text
            style={[
              styles.sectionDescription,
              isMobile && styles.sectionDescriptionMobile,
            ]}
          >
            Ferramentas e tecnologias que utilizo para transformar
            ideias em interfaces, aplicações mobile e soluções completas.
          </Text>

          <View
            style={[
              styles.skillsGrid,
              isMobile && styles.skillsGridMobile,
            ]}
          >
            {skills.map((group) => (
              <View
                key={group.number}
                style={[
                  styles.skillCard,
                  !isMobile && styles.skillCardDesktop,
                ]}
              >
                <View style={styles.skillTop}>
                  <View style={styles.skillNumberBox}>
                    <Text style={styles.skillNumber}>
                      {group.number}
                    </Text>
                  </View>

                  <View style={styles.skillLine} />
                </View>

                <Text style={styles.skillTitle}>
                  {group.title}
                </Text>

                <Text style={styles.skillDescription}>
                  {group.description}
                </Text>

                <View style={styles.skillChips}>
                  {group.items.map((item) => (
                    <View
                      key={item}
                      style={styles.skillChip}
                    >
                      <Text style={styles.skillChipText}>
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* =================================================
            SOBRE MIM
        ================================================= */}

        <View
          style={styles.sectionBorder}
          onLayout={(event) => {
            sobreY.current =
              event.nativeEvent.layout.y;
          }}
        >
          <View style={styles.sectionMarker}>
            <View style={styles.sectionMarkerLine} />

            <Text style={styles.sectionEyebrow}>
              SOBRE MIM
            </Text>
          </View>

          <Text
            style={[
              styles.aboutTitle,
              isMobile && styles.aboutTitleMobile,
            ]}
          >
            Uma trajetória que conecta{" "}
            <Text style={styles.aboutHighlight}>
              experiência, visão de negócio e tecnologia
            </Text>
          </Text>

          <View
            style={[
              styles.aboutCard,
              isMobile && styles.aboutCardMobile,
            ]}
          >
            <View style={styles.aboutGlow} />
            <View style={styles.aboutAccent} />

            <Text style={styles.aboutIntro}>
              Minha história profissional começou muito antes da
              programação — e é justamente isso que torna minha jornada
              na tecnologia diferente.
            </Text>

            <Text style={styles.aboutText}>
              Sou formada em Administração, com pós-graduação em Gestão
              Empresarial, e construí mais de 10 anos de experiência na
              área administrativa. Ao longo desse caminho desenvolvi uma
              visão prática sobre processos, organização, pessoas, dados
              e necessidades reais de negócio.
            </Text>

            <Text style={styles.aboutText}>
              Com o tempo, a vontade de transformar problemas em soluções
              me aproximou da tecnologia. Hoje curso Análise e
              Desenvolvimento de Sistemas, com conclusão prevista para
              dezembro de 2026, direcionando minha formação para
              desenvolvimento Front-end e Mobile.
            </Text>

            <Text style={styles.aboutText}>
              Nos meus projetos, procuro ir além do exercício técnico.
              Gosto de entender o contexto, pensar na experiência de quem
              vai utilizar a aplicação e transformar processos e ideias
              em produtos digitais funcionais, organizados e visualmente
              consistentes.
            </Text>

            <View style={styles.aboutStats}>
              <View style={styles.aboutStat}>
                <Text style={styles.aboutStatNumber}>
                  10+
                </Text>

                <Text style={styles.aboutStatLabel}>
                  anos de experiência profissional
                </Text>
              </View>

              <View style={styles.aboutStat}>
                <Text style={styles.aboutStatNumber}>
                  7
                </Text>

                <Text style={styles.aboutStatLabel}>
                  projetos selecionados
                </Text>
              </View>

              <View style={styles.aboutStat}>
                <Text style={styles.aboutStatNumber}>
                  2026
                </Text>

                <Text style={styles.aboutStatLabel}>
                  conclusão prevista em ADS
                </Text>
              </View>
            </View>

            <View style={styles.quote}>
              <View style={styles.quoteAccent} />

              <Text style={styles.quoteText}>
                Experiência de negócio e tecnologia podem caminhar juntas
                para transformar problemas reais em soluções digitais.
              </Text>
            </View>
          </View>

          {/* =================================================
              TRAJETÓRIA
          ================================================= */}

          <View style={styles.journeyHeader}>
            <View style={styles.sectionMarker}>
              <View style={styles.sectionMarkerLine} />

              <Text style={styles.sectionEyebrow}>
                MINHA TRAJETÓRIA
              </Text>
            </View>

            <Text
              style={[
                styles.journeyHeading,
                isMobile && styles.journeyHeadingMobile,
              ]}
            >
              Experiência que ganhou um novo caminho através do código
            </Text>

            <Text style={styles.journeyDescription}>
              Uma construção profissional em etapas — da gestão ao
              desenvolvimento de aplicações web e mobile.
            </Text>
          </View>

          <View style={styles.timeline}>
            {journey.map((item) => (
              <View
                key={item.number}
                style={[
                  styles.timelineCard,
                  isMobile && styles.timelineCardMobile,
                ]}
              >
                <View style={styles.timelineNumberBox}>
                  <Text style={styles.timelineNumber}>
                    {item.number}
                  </Text>
                </View>

                <View style={styles.timelineBody}>
                  <Text style={styles.timelineLabel}>
                    {item.label}
                  </Text>

                  <Text style={styles.timelineTitle}>
                    {item.title}
                  </Text>

                  <Text style={styles.timelineText}>
                    {item.text}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* =================================================
            PROJETOS
        ================================================= */}

        <View
          style={styles.sectionBorder}
          onLayout={(event) => {
            projetosY.current =
              event.nativeEvent.layout.y;
          }}
        >
          <View style={styles.sectionMarker}>
            <View style={styles.sectionMarkerLine} />

            <Text style={styles.sectionEyebrow}>
              PROJETOS SELECIONADOS
            </Text>
          </View>

          <Text
            style={[
              styles.sectionTitle,
              isMobile && styles.sectionTitleMobile,
            ]}
          >
            Ideias transformadas em aplicações
          </Text>

          <Text
            style={[
              styles.sectionDescription,
              isMobile && styles.sectionDescriptionMobile,
            ]}
          >
            Uma seleção de projetos web e mobile que representa minha
            evolução técnica e minha forma de transformar necessidades
            em soluções.
          </Text>

          <View style={styles.projectList}>
            {projects.map((project) => (
              <View
                key={project.number}
                style={[
                  styles.projectCard,
                  isMobile && styles.projectCardMobile,
                ]}
              >
                {/* =========================================
                    PREVIEW
                ========================================= */}

                <View
                  style={[
                    styles.projectMedia,

                    isMobile &&
                      styles.projectMediaMobile,

                    project.isBatPass &&
                      !isMobile &&
                      styles.projectMediaBatPass,

                    project.isBatPass &&
                      isMobile &&
                      styles.projectMediaBatPassMobile,
                  ]}
                >
                  <View style={styles.mediaGlow} />

                  <View style={styles.mediaTopBar}>
                    <View style={styles.mediaDots}>
                      <View style={styles.mediaDot} />
                      <View style={styles.mediaDot} />
                      <View style={styles.mediaDot} />
                    </View>

                    <Text style={styles.mediaLabel}>
                      PROJECT PREVIEW
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.projectImageArea,

                      isMobile &&
                        styles.projectImageAreaMobile,

                      project.isBatPass &&
                        !isMobile &&
                        styles.projectImageAreaBatPass,

                      project.isBatPass &&
                        isMobile &&
                        styles.projectImageAreaBatPassMobile,
                    ]}
                  >
                    {/*
                     * WEB
                     *
                     * Mantém o enquadramento que já ficou bom.
                     */}
                    {Platform.OS === "web" ? (
                      <Image
                        source={project.image}
                        resizeMode="contain"
                        style={styles.projectImage}
                      />
                    ) : (
                      /*
                       * EXPO GO / NATIVO
                       *
                       * Medidas explícitas para o React Native
                       * não depender de height 100%.
                       */
                      <Image
                        source={project.image}
                        resizeMode="contain"
                        style={[
                          styles.projectImageNative,
                          project.isBatPass &&
                            styles.projectImageNativeBatPass,
                        ]}
                      />
                    )}
                  </View>
                </View>

                {/* =========================================
                    CONTEÚDO
                ========================================= */}

                <View
                  style={[
                    styles.projectBody,
                    isMobile && styles.projectBodyMobile,
                  ]}
                >
                  <View style={styles.projectMeta}>
                    <View style={styles.projectNumberBox}>
                      <Text style={styles.projectNumber}>
                        {project.number}
                      </Text>
                    </View>

                    <View style={styles.categoryBadge}>
                      <View style={styles.categoryDot} />

                      <Text style={styles.categoryText}>
                        {project.category}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={[
                      styles.projectTitle,
                      isMobile && styles.projectTitleMobile,
                    ]}
                  >
                    {project.title}
                  </Text>

                  <Text style={styles.projectSubtitle}>
                    {project.subtitle}
                  </Text>

                  <Text style={styles.projectDescription}>
                    {project.description}
                  </Text>

                  {project.highlight && (
                    <View style={styles.projectHighlight}>
                      <Text style={styles.projectHighlightText}>
                        {project.highlight}
                      </Text>
                    </View>
                  )}

                  {project.demo && (
                    <DemoAccess
                      user={project.demo.user}
                      email={project.demo.email}
                      password={project.demo.password}
                    />
                  )}

                  <View style={styles.projectTechList}>
                    {project.technologies.map(
                      (technology) => (
                        <View
                          key={technology}
                          style={styles.projectTech}
                        >
                          <Text style={styles.projectTechText}>
                            {technology}
                          </Text>
                        </View>
                      )
                    )}
                  </View>

                  <Pressable
                    onPress={() =>
                      abrirLink(project.url)
                    }
                    style={({ pressed }) => [
                      styles.projectButton,
                      isMobile &&
                        styles.projectButtonMobile,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.projectButtonText}>
                      Ver projeto
                    </Text>

                    <Text style={styles.projectButtonIcon}>
                      ↗
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* =================================================
            CONTATO
        ================================================= */}

        <View style={styles.sectionBorder}>
          <View
            style={[
              styles.contactPanel,
              isMobile && styles.contactPanelMobile,
            ]}
          >
            <View style={styles.contactGlow} />

            <View style={styles.sectionMarker}>
              <View style={styles.sectionMarkerLine} />

              <Text style={styles.sectionEyebrow}>
                CONTATO
              </Text>
            </View>

            <Text
              style={[
                styles.contactTitle,
                isMobile && styles.contactTitleMobile,
              ]}
            >
              Vamos nos conectar?
            </Text>

            <Text
              style={[
                styles.contactDescription,
                isMobile &&
                  styles.contactDescriptionMobile,
              ]}
            >
              Conheça meus projetos, acompanhe minha trajetória
              profissional ou entre em contato comigo.
            </Text>

            <View
              style={[
                styles.contactGrid,
                isMobile && styles.contactGridMobile,
              ]}
            >
              <Pressable
                onPress={() =>
                  abrirLink(
                    "https://github.com/nataliapastre-dev"
                  )
                }
                style={({ pressed }) => [
                  styles.contactCard,
                  !isMobile &&
                    styles.contactCardDesktop,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.contactIconBox}>
                  <Text style={styles.contactIcon}>
                    {"</>"}
                  </Text>
                </View>

                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>
                    GITHUB
                  </Text>

                  <Text style={styles.contactValue}>
                    nataliapastre-dev
                  </Text>
                </View>

                <Text style={styles.contactArrow}>
                  ↗
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  abrirLink(
                    "https://www.linkedin.com/in/nataliapastre-dev/"
                  )
                }
                style={({ pressed }) => [
                  styles.contactCard,
                  !isMobile &&
                    styles.contactCardDesktop,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.contactIconBox}>
                  <Text style={styles.contactIcon}>
                    in
                  </Text>
                </View>

                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>
                    LINKEDIN
                  </Text>

                  <Text style={styles.contactValue}>
                    nataliapastre-dev
                  </Text>
                </View>

                <Text style={styles.contactArrow}>
                  ↗
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  abrirLink(
                    "mailto:natalia.pastre@yahoo.com.br"
                  )
                }
                style={({ pressed }) => [
                  styles.contactCard,
                  !isMobile &&
                    styles.contactCardDesktop,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.contactIconBox}>
                  <Text style={styles.contactIcon}>
                    @
                  </Text>
                </View>

                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>
                    E-MAIL
                  </Text>

                  <Text
                    style={[
                      styles.contactValue,
                      isSmallMobile &&
                        styles.contactValueSmall,
                    ]}
                  >
                    natalia.pastre@yahoo.com.br
                  </Text>
                </View>

                <Text style={styles.contactArrow}>
                  ↗
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* =================================================
            FOOTER
        ================================================= */}

        <View style={styles.footer}>
          <View style={styles.footerLogo}>
            <Text style={styles.footerLogoText}>
              N
            </Text>
          </View>

          <Text style={styles.footerName}>
            Natália Baptista Pastre
          </Text>

          <Text style={styles.footerRole}>
            Desenvolvedora Front-end & Mobile
          </Text>

          <View style={styles.footerLine} />

          <Text style={styles.footerPhrase}>
            Desenvolvendo • Aprendendo • Evoluindo
          </Text>

          <Text style={styles.footerTech}>
            React • React Native • Expo • TypeScript
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    width: "100%",
    maxWidth: 1120,
    alignSelf: "center",
    paddingHorizontal: 40,
    paddingTop: 28,
    paddingBottom: 20,
  },

  contentMobile: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  pressed: {
    opacity: 0.72,
  },

  /* =====================================================
     HERO
  ===================================================== */

  hero: {
    position: "relative",
    minHeight: 620,
    justifyContent: "center",
    overflow: "hidden",
  },

  heroMobile: {
    minHeight: 670,
  },

  heroGlowOne: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: 420,
    backgroundColor: "#1B0D34",
    opacity: 0.55,
    right: -190,
    top: 40,
  },

  heroGlowTwo: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 250,
    backgroundColor: "#10183A",
    opacity: 0.34,
    left: -120,
    bottom: 20,
  },

  heroGlowThree: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 180,
    backgroundColor: "#25103A",
    opacity: 0.25,
    left: "45%",
    top: -100,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#15101F",
    borderWidth: 1,
    borderColor: COLORS.borderPurple,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 50,
    marginBottom: 25,
  },

  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: COLORS.primary,
    marginRight: 8,
  },

  badgeText: {
    color: COLORS.primarySoft,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  hello: {
    color: COLORS.primarySoft,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },

  name: {
    color: COLORS.white,
    fontSize: 57,
    lineHeight: 65,
    fontWeight: "800",
    letterSpacing: -2,
    maxWidth: 950,
  },

  nameMobile: {
    fontSize: 39,
    lineHeight: 46,
    letterSpacing: -1,
  },

  nameSmallMobile: {
    fontSize: 33,
    lineHeight: 40,
  },

  nameHighlight: {
    color: COLORS.primary,
  },

  role: {
    color: COLORS.text,
    fontSize: 26,
    lineHeight: 36,
    fontWeight: "600",
    marginTop: 9,
    marginBottom: 20,
  },

  roleMobile: {
    fontSize: 20,
    lineHeight: 29,
  },

  roleHighlight: {
    color: COLORS.primaryLight,
  },

  heroDescription: {
    color: "#BCBCC7",
    fontSize: 17,
    lineHeight: 28,
    maxWidth: 700,
  },

  heroDescriptionMobile: {
    fontSize: 15,
    lineHeight: 24,
  },

  heroDescriptionSecondary: {
    color: "#7F7F8E",
    fontSize: 14,
    lineHeight: 23,
    maxWidth: 670,
    marginTop: 7,
  },

  heroActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 30,
  },

  heroActionsMobile: {
    width: "100%",
  },

  heroButtonMobile: {
    minWidth: "47%",
  },

  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryStrong,
    borderWidth: 1,
    borderColor: "#9B70F7",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 11,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 9,
  },

  secondaryButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111119",
    borderWidth: 1,
    borderColor: "#323240",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 11,
  },

  secondaryButtonText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "600",
  },

  resumeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#171020",
    borderWidth: 1,
    borderColor: "#51386E",
    paddingHorizontal: 19,
    paddingVertical: 14,
    borderRadius: 11,
  },

  resumeIcon: {
    color: COLORS.primarySoft,
    fontSize: 17,
    fontWeight: "800",
    marginRight: 8,
  },

  resumeButtonText: {
    color: COLORS.primaryLight,
    fontSize: 13,
    fontWeight: "700",
  },

  heroDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },

  heroDetailLine: {
    width: 38,
    height: 2,
    backgroundColor: COLORS.primary,
    marginRight: 10,
  },

  heroDetailText: {
    color: "#61616F",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.6,
  },

  /* =====================================================
     SEÇÕES
  ===================================================== */

  section: {
    paddingTop: 70,
    paddingBottom: 80,
  },

  sectionBorder: {
    paddingTop: 80,
    paddingBottom: 80,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSoft,
  },

  sectionMarker: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  sectionMarkerLine: {
    width: 22,
    height: 2,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    marginRight: 9,
  },

  sectionEyebrow: {
    color: COLORS.primarySoft,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2.1,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 35,
    lineHeight: 44,
    fontWeight: "800",
    letterSpacing: -0.9,
    maxWidth: 780,
  },

  sectionTitleMobile: {
    fontSize: 27,
    lineHeight: 35,
  },

  sectionDescription: {
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 25,
    maxWidth: 700,
    marginTop: 10,
    marginBottom: 31,
  },

  sectionDescriptionMobile: {
    fontSize: 14,
    lineHeight: 23,
  },

  /* =====================================================
     TECNOLOGIAS
  ===================================================== */

  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },

  skillsGridMobile: {
    flexDirection: "column",
  },

  skillCard: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 21,
    minHeight: 190,
  },

  skillCardDesktop: {
    width: "49%",
  },

  skillTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  skillNumberBox: {
    width: 36,
    height: 28,
    borderRadius: 8,
    backgroundColor: COLORS.primaryStrong,
    alignItems: "center",
    justifyContent: "center",
  },

  skillNumber: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },

  skillLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#292636",
    marginLeft: 12,
  },

  skillTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 6,
  },

  skillDescription: {
    color: "#7F7F8D",
    fontSize: 12,
    lineHeight: 19,
    marginBottom: 16,
  },

  skillChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },

  skillChip: {
    backgroundColor: "#171720",
    borderWidth: 1,
    borderColor: "#2D2D3A",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },

  skillChipText: {
    color: "#C1C1CB",
    fontSize: 11,
    fontWeight: "600",
  },

  /* =====================================================
     SOBRE MIM
  ===================================================== */

  aboutTitle: {
    color: COLORS.white,
    fontSize: 38,
    lineHeight: 48,
    fontWeight: "800",
    letterSpacing: -1,
    maxWidth: 880,
    marginBottom: 30,
  },

  aboutTitleMobile: {
    fontSize: 28,
    lineHeight: 37,
  },

  aboutHighlight: {
    color: COLORS.primarySoft,
  },

  aboutCard: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 22,
    padding: 32,
  },

  aboutCardMobile: {
    padding: 21,
  },

  aboutGlow: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: "#1B0E2D",
    opacity: 0.32,
    right: -130,
    top: -150,
  },

  aboutAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 150,
    height: 3,
    backgroundColor: COLORS.primary,
  },

  aboutIntro: {
    color: COLORS.white,
    fontSize: 21,
    lineHeight: 31,
    fontWeight: "700",
    marginBottom: 17,
    maxWidth: 850,
  },

  aboutText: {
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 26,
    marginBottom: 14,
    maxWidth: 900,
  },

  aboutStats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
    marginBottom: 10,
  },

  aboutStat: {
    flexGrow: 1,
    minWidth: 180,
    backgroundColor: "#0C0C13",
    borderWidth: 1,
    borderColor: "#292936",
    borderRadius: 12,
    padding: 15,
  },

  aboutStatNumber: {
    color: COLORS.primarySoft,
    fontSize: 21,
    fontWeight: "800",
    marginBottom: 3,
  },

  aboutStatLabel: {
    color: "#888895",
    fontSize: 11,
    lineHeight: 17,
  },

  quote: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: COLORS.surfacePurple,
    borderWidth: 1,
    borderColor: "#37264A",
    borderRadius: 12,
    padding: 17,
    paddingLeft: 21,
    marginTop: 12,
  },

  quoteAccent: {
    position: "absolute",
    width: 3,
    height: "100%",
    left: 0,
    top: 0,
    backgroundColor: COLORS.primary,
  },

  quoteText: {
    color: COLORS.primaryLight,
    fontSize: 14,
    lineHeight: 23,
    fontWeight: "600",
  },

  /* =====================================================
     TRAJETÓRIA
  ===================================================== */

  journeyHeader: {
    marginTop: 68,
    marginBottom: 25,
  },

  journeyHeading: {
    color: COLORS.white,
    fontSize: 31,
    lineHeight: 40,
    fontWeight: "800",
    maxWidth: 760,
    letterSpacing: -0.5,
  },

  journeyHeadingMobile: {
    fontSize: 24,
    lineHeight: 32,
  },

  journeyDescription: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 23,
    maxWidth: 650,
    marginTop: 8,
  },

  timeline: {
    gap: 12,
  },

  timelineCard: {
    flexDirection: "row",
    backgroundColor: "#0F0F17",
    borderWidth: 1,
    borderColor: "#292736",
    borderRadius: 16,
    padding: 19,
  },

  timelineCardMobile: {
    padding: 15,
  },

  timelineNumberBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: COLORS.primaryStrong,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  timelineNumber: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },

  timelineBody: {
    flex: 1,
  },

  timelineLabel: {
    color: COLORS.primarySoft,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.3,
    marginBottom: 4,
  },

  timelineTitle: {
    color: COLORS.white,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "700",
    marginBottom: 5,
  },

  timelineText: {
    color: "#9999A7",
    fontSize: 13,
    lineHeight: 22,
  },

  /* =====================================================
     PROJETOS
  ===================================================== */

  projectList: {
    gap: 32,
  },

  projectCard: {
    overflow: "hidden",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "#2C2C3A",
    borderRadius: 21,
  },

  projectCardMobile: {
    borderRadius: 17,
  },

  /*
   * WEB / DESKTOP
   */
  projectMedia: {
    position: "relative",
    width: "100%",
    height: 410,
    backgroundColor: "#08080E",
    borderBottomWidth: 1,
    borderBottomColor: "#252531",
    overflow: "hidden",
  },

  /*
   * MOBILE
   */
  projectMediaMobile: {
    height: 225,
  },

  /*
   * BATPASS WEB
   */
  projectMediaBatPass: {
    height: 330,
  },

  /*
   * BATPASS MOBILE
   */
  projectMediaBatPassMobile: {
    height: 185,
  },

  mediaGlow: {
    position: "absolute",
    width: 480,
    height: 260,
    borderRadius: 300,
    backgroundColor: "#1D0F31",
    opacity: 0.26,
    alignSelf: "center",
    top: -170,
  },

  mediaTopBar: {
    height: 32,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#1E1E29",
  },

  mediaDots: {
    flexDirection: "row",
    gap: 5,
  },

  mediaDot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#464653",
  },

  mediaLabel: {
    color: "#666675",
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  /*
   * ÁREA DA IMAGEM — WEB
   */
  projectImageArea: {
    width: "100%",
    height: 378,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  /*
   * ÁREA DA IMAGEM — MOBILE
   *
   * flex: 1 evita conflito de altura no nativo.
   */
  projectImageAreaMobile: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  /*
   * BATPASS — WEB
   */
  projectImageAreaBatPass: {
    height: 298,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },

  /*
   * BATPASS — MOBILE
   */
  projectImageAreaBatPassMobile: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  /*
   * WEB
   */
  projectImage: {
    width: "100%",
    height: "100%",
  },

  /*
   * EXPO GO / NATIVO
   *
   * Aqui não usamos height: "100%".
   * O React Native recebe uma altura real.
   */
  projectImageNative: {
    width: "98%",
    height: 180,
    alignSelf: "center",
  },

  /*
   * BATPASS NATIVO
   */
  projectImageNativeBatPass: {
    width: "98%",
    height: 145,
  },

  projectBody: {
    padding: 27,
  },

  projectBodyMobile: {
    padding: 19,
  },

  projectMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  projectNumberBox: {
    minWidth: 41,
    height: 31,
    borderRadius: 9,
    backgroundColor: COLORS.primaryStrong,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 9,
  },

  projectNumber: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },

  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#15151E",
    borderWidth: 1,
    borderColor: "#30303E",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  categoryDot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.blue,
    marginRight: 6,
  },

  categoryText: {
    color: "#9A9AA8",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
  },

  projectTitle: {
    color: COLORS.white,
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  projectTitleMobile: {
    fontSize: 22,
    lineHeight: 29,
  },

  projectSubtitle: {
    color: COLORS.primaryLight,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 11,
  },

  projectDescription: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 23,
    maxWidth: 820,
  },

  projectHighlight: {
    backgroundColor: "#16111F",
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    borderRadius: 9,
    paddingHorizontal: 13,
    paddingVertical: 11,
    marginTop: 13,
  },

  projectHighlightText: {
    color: "#C0BACB",
    fontSize: 12,
    lineHeight: 19,
  },

  projectTechList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 17,
  },

  projectTech: {
    backgroundColor: "#191320",
    borderWidth: 1,
    borderColor: "#3D2954",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  projectTechText: {
    color: COLORS.primaryLight,
    fontSize: 10,
    fontWeight: "600",
  },

  projectButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryStrong,
    borderWidth: 1,
    borderColor: "#9465F1",
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 9,
    marginTop: 18,
  },

  projectButtonMobile: {
    width: "100%",
    justifyContent: "center",
  },

  projectButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  projectButtonIcon: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 8,
  },

  /* =====================================================
     DEMONSTRAÇÃO
  ===================================================== */

  demoBox: {
    backgroundColor: "#0A0A10",
    borderWidth: 1,
    borderColor: "#3B2951",
    borderRadius: 11,
    padding: 14,
    marginTop: 14,
    maxWidth: 460,
  },

  demoHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  demoDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    marginRight: 7,
  },

  demoHeadingText: {
    color: COLORS.primarySoft,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },

  demoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3,
  },

  demoLabel: {
    width: 65,
    color: COLORS.mutedDark,
    fontSize: 11,
    lineHeight: 19,
    fontWeight: "600",
  },

  demoValue: {
    flexShrink: 1,
    color: COLORS.text,
    fontSize: 11,
    lineHeight: 19,
    fontWeight: "600",
  },

  /* =====================================================
     CONTATO
  ===================================================== */

  contactPanel: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#0F0E17",
    borderWidth: 1,
    borderColor: "#2D2939",
    borderRadius: 23,
    padding: 34,
    alignItems: "center",
  },

  contactPanelMobile: {
    padding: 21,
    alignItems: "flex-start",
  },

  contactGlow: {
    position: "absolute",
    width: 330,
    height: 330,
    borderRadius: 330,
    backgroundColor: "#1C0C30",
    opacity: 0.45,
    top: -220,
    right: -80,
  },

  contactTitle: {
    color: COLORS.white,
    fontSize: 38,
    lineHeight: 47,
    fontWeight: "800",
    textAlign: "center",
  },

  contactTitleMobile: {
    fontSize: 28,
    lineHeight: 36,
    textAlign: "left",
  },

  contactDescription: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 23,
    maxWidth: 620,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 27,
  },

  contactDescriptionMobile: {
    textAlign: "left",
  },

  contactGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 11,
  },

  contactGridMobile: {
    flexDirection: "column",
  },

  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#12121B",
    borderWidth: 1,
    borderColor: "#2E2E3C",
    borderRadius: 13,
    padding: 14,
  },

  contactCardDesktop: {
    width: "32%",
  },

  contactIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#1B1326",
    borderWidth: 1,
    borderColor: "#3A2850",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  contactIcon: {
    color: COLORS.primarySoft,
    fontSize: 13,
    fontWeight: "800",
  },

  contactInfo: {
    flex: 1,
  },

  contactLabel: {
    color: COLORS.mutedDark,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 2,
  },

  contactValue: {
    color: COLORS.text,
    fontSize: 11,
    lineHeight: 17,
    fontWeight: "600",
  },

  contactValueSmall: {
    fontSize: 9.5,
  },

  contactArrow: {
    color: COLORS.primary,
    fontSize: 16,
    marginLeft: 3,
  },

  /* =====================================================
     FOOTER
  ===================================================== */

  footer: {
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSoft,
    paddingTop: 52,
    paddingBottom: 50,
  },

  footerLogo: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: COLORS.primaryStrong,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  footerLogoText: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
  },

  footerName: {
    color: COLORS.white,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "800",
    textAlign: "center",
  },

  footerRole: {
    color: COLORS.primarySoft,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 4,
  },

  footerLine: {
    width: 52,
    height: 2,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginVertical: 16,
  },

  footerPhrase: {
    color: "#C1C1CB",
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "700",
    textAlign: "center",
  },

  footerTech: {
    color: "#626270",
    fontSize: 10,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 8,
  },
});