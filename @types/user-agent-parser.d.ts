declare module "user-agent-parser" {
  interface Browser {
    name: string;
    version: string;
  }

  interface OS {
    name: string;
    version: string;
  }

  interface Device {
    model?: string;
    type?: string; // Can be 'desktop', 'mobile', etc.
    vendor?: string;
  }

  interface UserAgentResult {
    ua: string;
    browser: Browser;
    os: OS;
    device: Device;
    cpu: {
      architecture: string; // e.g., "amd64", "arm64"
    };
  }

  export default function userAgentParser(ua: string): UserAgentResult;
}
