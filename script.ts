
// Store user data in localStorage
const storeUserData = (username: string, email: string, phone: string, skills: string) => {
  const resumeData = { username, email, phone, skills };
  localStorage.setItem('resumeData', JSON.stringify(resumeData));
};

// Retrieve user data from localStorage
const getUserData = () => {
  const storedData = localStorage.getItem('resumeData');
  if (storedData) {
    return JSON.parse(storedData);
  }
  return null;
};

// Form handling and resume generation
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeContainer = document.getElementById('resume-container') as HTMLElement;
const shareLinkBtn = document.getElementById('share-link-btn') as HTMLButtonElement;
const downloadPdfBtn = document.getElementById('download-pdf-btn') as HTMLButtonElement;

// Handle form submission
form.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  // Retrieve user input
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const phone = (document.getElementById('phone') as HTMLInputElement).value;
  const skills = (document.getElementById('skills') as HTMLInputElement).value;

  // Update the resume display
  (document.getElementById('resume-name') as HTMLElement).textContent = name;
  (document.getElementById('resume-email') as HTMLElement).textContent = email;
  (document.getElementById('resume-phone') as HTMLElement).textContent = phone;
  (document.getElementById('resume-skills') as HTMLElement).textContent = skills;

  // Store user data in localStorage for sharing
  storeUserData(name, email, phone, skills);

  // Show the resume section and buttons
  resumeContainer.style.display = 'block';
  shareLinkBtn.style.display = 'block'; // Show the share link button
  downloadPdfBtn.style.display = 'block'; // Show the download button
});

// PDF Download using window.print()
downloadPdfBtn.addEventListener('click', () => {
  window.print();
});

// Check if accessed via a shareable link and load resume from localStorage
const params = new URLSearchParams(window.location.search);
const storedUsername = params.get('username');
if (storedUsername) {
  const resumeData = getUserData();
  if (resumeData) {
    (document.getElementById('resume-name') as HTMLElement).textContent = resumeData.username;
    (document.getElementById('resume-email') as HTMLElement).textContent = resumeData.email;
    (document.getElementById('resume-phone') as HTMLElement).textContent = resumeData.phone;
    (document.getElementById('resume-skills') as HTMLElement).textContent = resumeData.skills;

    // Show only the resume section without the form and buttons
    resumeContainer.style.display = 'block';
    form.style.display = 'none'; // Hide the form
    shareLinkBtn.style.display = 'none'; // Hide the share link button
    downloadPdfBtn.style.display = 'none'; // Hide the download button
  }
}

// Share link button functionality
shareLinkBtn.addEventListener('click', () => {
  const resumeData = getUserData();
  if (resumeData) {
    const username = resumeData.username.replace(/\s+/g, '').toLowerCase(); // simplified username from name
    const shareLink = `${window.location.origin}/?username=${username}`;
    navigator.clipboard.writeText(shareLink)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => console.error('Failed to copy link', err));
  } else {
    alert('No resume data found to share.');
  }
});
