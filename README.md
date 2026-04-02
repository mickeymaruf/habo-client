
---

# 🟢 Habo (Community Habit Challenge Platform)

**Habo** is a community-driven platform designed to turn personal growth into a social experience. Users can create, discover, and join habit-building challenges—ranging from fitness to sustainability—while tracking progress through a streak-based system and engaging with a supportive community.

* **Live App:** [https://habo-client.vercel.app](https://habo-client.vercel.app)
* **API Docs:** [https://habo-server.vercel.app](https://habo-server.vercel.app)

---

## 🚀 Features

### **For Users**
* **Participate in Challenges:** Join public challenges or create.
* **Interactive Habit Tracking:** Daily checklist.
* **Social Engagement:** Voting system and comment threads for communication.
* **Premium Access:** Securely unlock exclusive, high-value challenges via Stripe.
* **Dynamic Discovery:** Filter challenges by category (Fitness, Productivity, etc.) or explore "Featured" content.

### **For Admins**
* **Content Moderation:** Oversees the platform. Ban or unban public challenges to ensure quality.
* **Community Safety:** Moderate comments and manage user accounts.
* **Curation:** Feature top-performing challenges on the global homepage.

---

## 🛠️ Technologies Used

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), Tailwind CSS |
| **Backend** | Node.js, Express |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | JWT (JSON Web Tokens) with RBAC |
| **Payments** | Stripe |
| **Validation** | Zod |
| **Deployment** | Vercel |

-----

## 💻 Frontend Setup: Habo (Next.js 14)

### **1. Prerequisites**

  * **Node.js:** v18.17 or later.
  * **Package Manager:** `npm`.
  * **Backend URL:** Ensure your Express backend is running (default: `http://localhost:5000` or `https://habo-server.vercel.app`).

### **2. Installation & Environment**

1.  **Navigate to the frontend directory:**
    ```bash
    cd habo-client
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Environment Variables:**
    Copy the provided example file to create your local environment file:

    ```bash
    cp .env.example .env.local
    ```
### **3. Development Workflow**

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
2.  **Access the App:** Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser.

-----
