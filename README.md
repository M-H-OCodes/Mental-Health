# EcoMind - Mental Well-Being for Youth 🌿

EcoMind (Mindful Youth) is a modern web application dedicated to supporting adolescent mental health. It provides evidence-based guides, community blogs with live word count and reading time estimations, educational resources, and cloud-streamed video sessions.

---

## 🚀 GitHub Publishing & Repository Size Optimization

### Why This Repository Is Ready for GitHub:
1. **Under GitHub File & Repository Limits**:
   - GitHub has a strict **100 MB per file limit** and a recommended repository size under **1 GB**.
   - Video files (.mp4) easily exceed these limits when committed directly to Git.
   - **Solution**: All 10 educational videos are hosted on **Google Drive** ([Shared Folder](https://drive.google.com/drive/folders/1Xwinfq7LEbznQnoYSupxtPRO33dGFxHt?usp=sharing)) and streamed dynamically using Google Drive embedded players and preview APIs.
   - **Total repository size**: **< 5 MB** (Lightning-fast git cloning, zero Git LFS overhead, and instant page loads).

2. **Automated GitHub Pages CI/CD Included**:
   - A preconfigured GitHub Actions workflow (`.github/workflows/deploy.yml`) is provided for automated zero-configuration deployment to GitHub Pages on every push.

---

## 📦 How to Upload and Publish on GitHub

### Step 1: Initialize Git and Push to GitHub
Open your terminal inside the project directory and run:

```bash
git init
git add .
git commit -m "feat: complete EcoMind mental health platform with Google Drive video streaming"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

*(Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub username and repository name).*

### Step 2: Enable GitHub Pages in 2 Clicks
1. Go to your repository on GitHub.
2. Click **Settings** (gear icon) -> **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - Set **Source** to **GitHub Actions**.
4. The deployment workflow will run automatically. In about 1 minute, your live site will be published at:
   `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

---

## 🎥 Google Drive Video Integration

All video sessions are connected to the official Google Drive folder:
- **Shared Drive Folder**: [Google Drive Folder Link](https://drive.google.com/drive/folders/1Xwinfq7LEbznQnoYSupxtPRO33dGFxHt?usp=sharing)

### Video Mappings:
| Video Title | Google Drive File ID | Category | Reference |
| :--- | :--- | :--- | :--- |
| **What is Mental Health?** | `1oA7GyVgVc2ygywNvno5NKXkY1aVWAmVr` | Awareness | Mental Health Week |
| **10 Common Mental Illnesses** | `1AJDMCx-6PiWvuYxyabqXGX3eD66pTOEz` | Awareness | Psych2Go |
| **What is Anxiety and Depression?** | `1XgJtSO5zqNggN77JiLqWFG6dhPhUVqub` | Awareness | Turning Point |
| **Mental Health: What it is & why it matters** | `1xXMGZ8HfNJB8fQEZaPXjA3M5kxhA_Ko7` | Societal Burden | CBC Kids News |
| **Societal Burden and Expectations** | `1whC-YwHUKZGv8vUl3ne7ahY0ayFvhUdo` | Societal Burden | EcoMind |
| **Teen Health: Mental Health** | `1NTbPXxKk9Ip2beNG9iXDEpCS3Qm_NTWm` | Societal Burden | Penn State PRO Wellness |
| **Ways to Overcome Mental Health Issues** | `1ii2gMY_SZw9PpbqsaHb9EQ5Vq3lntcw6` | Self-Care & Solutions | Mind Matters |
| **8 Things You Can Do To Improve Mental Health** | `178WE6zR_sLGUN-rlRgPJgztdoG5BY1Tq` | Self-Care & Solutions | Psych2Go |
| **Atomic Habits for Mental Health** | `1KVpvXlVrl4sKp1akN1ecd98-6tOgAIKm` | Self-Care & Solutions | Therapy in a Nutshell |
| **Overcoming Depression, Anxiety & Stress** | `1QsLdfTBzJolNpFQqakDY7ghaxApVu3Qb` | Self-Care & Solutions | Clinical Guidance |

---

## 🛠️ Features & Functionalities

- **Home Page**: Hero introduction, scientific mental health insights cards, featured community articles, awareness video players, and mission statement.
- **All Blogs Gallery**: Filter articles by category (*Mental Health Awareness, Stress Management, Societal Burden, Wellness & Self-Care*), live keyword search, and responsive cards.
- **Blog Detail Reader**: Formatted article reader with reading time, word count, publication date, and back navigation.
- **Write a Blog**:
  - Live real-time word counter and estimated reading time calculator.
  - Image cover selector + custom upload support.
  - **Your Blogs Management**: In-line instant **Edit**, **Save**, **Cancel**, and **Delete** actions.
- **Mental Well-being Guide**: Academic research citations (Springer 2020, MDPI 2021, Springer 2021, WHO) with deep-dive sections.
- **About Us**: Distinctive zigzag responsive grid layout with fade-in animations and sticky bottom navigation.
- **Authentication**: Email/Password Sign In & Sign Up with **1-click Quick Guest Sign-In** for instant testing.

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start development server (Port 3000)
npm run dev

# 3. Run automated tests
npx tsx --test src/utils/blogUtils.test.ts

# 4. Build for production (outputs to /dist)
npm run build
```

---

## 📄 License
SPDX-License-Identifier: Apache-2.0
© 2025 EcoMind / Mindful Youth. All Rights Reserved.
