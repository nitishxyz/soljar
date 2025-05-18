export default function DeveloperGuidePage() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-8">Soljar Developer Guide</h1>
      <p className="text-lg mb-6">
        Welcome to the Soljar Developer Guide! This guide provides technical
        details about the Soljar platform, including its on-chain program,
        architecture, and how to integrate with it if needed.
      </p>
      <p className="mb-4">
        This section is intended for developers who want a deeper understanding
        of Soljar&apos;s mechanics or are considering building on top of or
        alongside Soljar.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Key Sections:</h2>
      <ul className="list-disc list-inside space-y-2 mb-6">
        {/* Add links to developer guide sections as they are created */}
        {/* 
        <li>
          <a href="/docs/developer-guide/program-architecture" className="text-primary hover:underline">
            Program Architecture
          </a>: An overview of the Solana program structure, accounts, and instructions.
        </li>
        <li>
          <a href="/docs/developer-guide/integration" className="text-primary hover:underline">
            Integration Guide
          </a>: How to interact with Soljar programmatically.
        </li> 
        */}
        <li>
          <p>
            More sections coming soon, including details on program
            architecture, instructions, and state accounts.
          </p>
        </li>
      </ul>
      <p>
        Navigate through the sections using the sidebar to find the information
        you need.
      </p>
    </article>
  );
}
