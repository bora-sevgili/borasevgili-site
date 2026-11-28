/* Add a new project as a new object at the END of this list. Newest projects show first.
   The home page and the Projects page, including the tag filters, are built from this list. */
window.PROJECTS = [
  {
    id: 'linux-usb', title: 'Linux Persistence USB', icon: 'pixel-linux',
    tags: ['Linux'], tech: ['Linux', 'Command Line', 'Vim'],
    summary: 'A Kali Linux USB drive that keeps my files between boots.',
    brief: 'I built a persistent Kali USB so my files and settings survive a reboot, and I practised the command line while fixing problems.',
    body: ['I made a persistent USB drive for Kali Linux. It lets me carry my Linux environment with me and use it on another computer.', 'I learned how to create and manage a persistent installation, and I got hands-on practice with the Linux command line, filesystems and troubleshooting.']
  },
  {
    id: 'domain-https', title: 'From domain to HTTPS', icon: 'pixel-web',
    tags: ['Web', 'DNS'], tech: ['Namecheap', 'DNS', 'GitHub Pages'],
    summary: 'Namecheap DNS, GitHub Pages and a managed certificate.',
    brief: 'I registered borasevgili.me, published the DNS records, and compared lookups from Namecheap and Google Public DNS before HTTPS went live.',
    body: ['I registered borasevgili.me with Namecheap, managed the DNS records, and connected the domain to GitHub Pages. I compared TXT lookup results from Namecheap’s nameserver and Google Public DNS to check that the records were publicly visible.', 'GitHub Pages obtained a TLS certificate for the domain. During setup I also saw how a missing `CNAME` file can disrupt a branch-published site, then restored the custom-domain setup.'],
    image: { src: 'images/github-pages-https.png', alt: 'GitHub Pages settings for borasevgili.me showing a successful DNS check and an active TLS certificate', caption: 'My GitHub Pages settings during custom-domain setup.' },
    links: [{ label: 'Visit borasevgili.me', href: 'https://borasevgili.me/', primary: true }, { label: 'Read the DNS and HTTPS notes', href: 'lab-notes.html' }]
  },
  {
    id: 'outline-vpn', title: 'Outline VPN on Azure', icon: 'pixel-vpn',
    tags: ['Networking', 'Cloud', 'Linux'], tech: ['Azure', 'Linux', 'Outline'],
    summary: 'A personal Outline server on a Linux VM in Azure.',
    brief: 'I set the server up by hand over SSH, opened the Azure firewall ports, and tested access keys with Outline Client.',
    body: ['I provisioned a Linux virtual machine with Azure for Students and set up my own Outline server. Outline Manager handles access keys, and Outline Client uses a key to connect to the server. Outline carries client traffic through an encrypted Shadowsocks proxy.', 'This assignment gave me practice working with a remote machine and thinking through the difference between administrative access and client access.']
  }
];
