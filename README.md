# PTE Core Practice

An open-source web application for practicing PTE (Pearson Test of English) speaking and writing tasks with a focus on RS (Repeat Sentence) and WFD (Write From Dictation) exercises.

![PTE Core Practice Screenshot](assets/images/screenshot.png)

## Features

- **RS (Repeat Sentence) Practice**
  - Audio playback with controls (play/pause, rewind, forward)
  - Adjustable playback speed
  - Optional subtitles
  - Keyboard shortcuts for efficient practice
  - Smooth animations and modern UI

- **WFD (Write From Dictation) Practice**
  - Audio playback with clear controls
  - Text input for practice answers
  - Reference solutions for verification
  - Progress tracking

- **Responsive Design**
  - Works on desktop, tablet, and mobile devices
  - Clean, intuitive interface
  - Accessibility features

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (for development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/PTE-Core-Practice.git
cd PTE-Core-Practice
```

2. Open `index.html` in your browser or use a local development server.

For development with live reload:
```bash
npm install
npm start
```

## Project Structure

```
PTE-Core-Practice/
├── index.html          # RS practice page
├── wfd.html            # WFD practice page
├── about.html          # About page
├── contact.html        # Contact page
├── css/                # Stylesheets
│   ├── styles.css      # Global styles
│   ├── rs.css          # RS-specific styles
│   └── wfd.css         # WFD-specific styles
├── js/                 # JavaScript
│   ├── script.js       # Global functionality
│   ├── rs.js           # RS-specific functionality
│   └── wfd.js          # WFD-specific functionality
└── assets/             # Media assets
    ├── RS material/    # RS audio and subtitles
    └── WFD material/   # WFD audio and text
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## Development Guidelines

- Use semantic HTML for better accessibility
- Follow BEM methodology for CSS class naming
- Add proper comments in CSS and JavaScript files
- Ensure responsive design works on all devices
- Test across different browsers

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for their invaluable resources

## Contact

Project Link: [https://github.com/yourusername/PTE-Core-Practice](https://github.com/yourusername/PTE-Core-Practice)

---

Made with ❤️ for PTE test takers everywhere
