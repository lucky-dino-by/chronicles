# Setup Instructions

## Installing Node.js

### Step 1: Install Homebrew

Homebrew is a package manager for macOS. Install it first:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the on-screen instructions. After installation, you may need to add Homebrew to your PATH:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Verify Homebrew installation:
```bash
brew --version
```

### Step 2: Install asdf

```bash
brew install asdf
```

Add asdf to your shell configuration:

```bash
# For zsh (default on macOS)
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ~/.zshrc
echo -e "\n. $(brew --prefix asdf)/etc/bash_completion.d/asdf.bash" >> ~/.zshrc
source ~/.zshrc
```

### Step 3: Install Node.js

Install the latest LTS version:

```bash
asdf install nodejs latest
asdf set global nodejs latest
```

Verify installation

```bash
node --version
npm --version
```

## Chronicles setup

Once Node.js is installed, continue with the Chronicles setup:

### Step 1: Install Yarn v4:

**Enable Corepack (Recommended):**
```bash
# Enable Corepack (comes with Node.js 16.10+)
corepack enable

# Verify Yarn version (should show v4.5.2)
yarn --version
```

**Manual Installation (If Corepack is missing):**
```bash
# Install Corepack manually
npm install -g corepack

# Reshim asdf to include Corepack
asdf reshim nodejs

# Verify Corepack is working
corepack --version
```

### Step 2: Install project dependencies:
```bash
yarn install
```

This will automatically download and use Yarn v4.5.2 as specified in `package.json`.

```bash
# Reshim asdf to include Yarn
asdf reshim nodejs
```

### Step 3: Run the development server:
```bash
yarn dev
```
