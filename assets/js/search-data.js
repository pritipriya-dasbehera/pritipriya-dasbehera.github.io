// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A growing collection of cool projects",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "Repositories",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-quick-introduction-to-renormalisation",
        
          title: "Quick Introduction to Renormalisation",
        
        description: "renormalisation without QED, field theory...",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/Renormalisation/";
          
        },
      },{id: "post-terminal-shortcuts-linux",
        
          title: "Terminal shortcuts (Linux)",
        
        description: "How to pause terminal?",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/terminal/";
          
        },
      },{id: "news-participated-in-the-discussion-meeting-on-geometry-probability-and-algorithms-at-icts-from-12-may-2025-to-16-may-2025",
          title: 'Participated in the discussion meeting on “Geometry, Probability and Algorithms” at ICTS from...',
          description: "",
          section: "News",},{id: "news-attended-the-iaifi-summer-school-2025-from-4-august-2025-to-8-august-2025",
          title: 'Attended the IAIFI Summer School 2025 from 4 August 2025 to 8 August...',
          description: "",
          section: "News",},{id: "news-attending-the-asia-pacific-quantum-error-correction-talk-tutorial-series-from-20-august-2025-to-17-december-2025",
          title: 'Attending the Asia-Pacific Quantum Error Correction talk/tutorial series from 20 August 2025 to...',
          description: "",
          section: "News",},{id: "news-the-simulation-of-liquid-gas-phase-transition-is-live-now-find-it-in-the-projects-section",
          title: 'The simulation of liquid-gas phase transition is live now. Find it in the...',
          description: "",
          section: "News",},{id: "projects-izhikevich-neuron-model",
          title: 'Izhikevich Neuron Model',
          description: "Visualisation of neuronal spiking dynamics",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Izhikevich/";
            },},{id: "projects-liquid-gas-phase-transition",
          title: 'Liquid-Gas Phase Transition',
          description: "MCMC simulation of liquid-gas phase transitions",
          section: "Projects",handler: () => {
              window.location.href = "/projects/PhaseTransition/";
            },},{id: "projects-vector-field-streamplot",
          title: 'Vector Field Streamplot',
          description: "Visualisation of vector fields and their streamlines",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Streamplot/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%70%72%69%74%69%70%72%69%79%61.%64%61%73%62%65%68%65%72%61@%6E%69%73%65%72.%61%63.%69%6E", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
