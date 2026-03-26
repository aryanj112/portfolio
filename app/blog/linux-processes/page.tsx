import type { Metadata } from "next";
import Link from "next/link";
import { BlogInlineRevealTerm } from "../../blog-inline-reveal-term";
import { BlogImageLightbox } from "../../blog-image-lightbox";
import { BlogViewCount } from "../../blog-view-count";
import { CodeOutputBlock } from "../../code-output-block";
import { SiteShell } from "../../components";

export const metadata: Metadata = {
  title: "Linux Processes",
};

export default function LinuxProcessesPage() {
  return (
    <SiteShell>
      <section className="blogPostShell">
        <h1>Linux Processes</h1>
        <div className="blogPostMetaRow">
          <p className="blogByline">By: Aryan Jain</p>
          <span className="blogPostDateReveal" tabIndex={0}>
            <span className="blogPostDate">Mar 25, 2026</span>
            <span className="blogPostDateHover">Last updated: Mar 25, 2026</span>
          </span>
          <BlogViewCount slug="linux-processes" />
        </div>
        <div className="blogReadingRow">
          <span className="blogReadingLabel">Prerequisite</span>
          <Link href="/blog/linux-basics" className="blogReadingButton">
            Linux Basics
          </Link>
        </div>

        <p>
          Processes are a very useful concept in computer science and are always working in the background to run all your software.
          So what is a process? <strong>A process is a program running on your computer.</strong> As we talked about in the previous blog
          the Kernel is what manages processes. Each process has a unique id that we call a
          <BlogInlineRevealTerm term="PID" reveal="process identifier" />.
        </p>

        <p>if we type <code>ps</code> in the terminal we get all the processes the current terminal session is running.</p>

        <CodeOutputBlock
          language="bash"
          code={`ps`}
          output={`PID      TTY       TIME   CMD
95903 ttys000    0:00.02 -zsh
96022 ttys000    0:00.00 /bin/zsh /Users/aryanjain/Projects/personal/Run Person
96025 ttys000    0:00.00 /bin/zsh ./run-dev.sh
96028 ttys000    0:10.37 /Users/aryanjain/.pyenv/versions/3.12.10/bin/python3 -
96029 ttys000    0:00.30 npm run dev --host 127.0.0.1      
96094 ttys000    0:06.10 node /Users/aryanjain/Projects/personal/frontend/node_
96095 ttys000    0:00.02 /Users/aryanjain/.pyenv/versions/3.12.10/bin/python3 -
96096 ttys000    0:20.47 /Users/aryanjain/.pyenv/versions/3.12.10/bin/python3 -
96097 ttys000    0:08.77 /Users/aryanjain/Projects/personal/frontend/node_modul
69151 ttys002    0:00.05 /bin/zsh -il
98911 ttys002    0:00.15 npm run dev   
98935 ttys002    0:00.54 node /Users/aryanjain/Projects/portfolio/node_modules/
98936 ttys002    0:31.90 next-server (v15.5.14) 
16345 ttys003    0:00.02 /bin/zsh
19283 ttys005    0:00.02 /bin/zsh
19295 ttys007    0:00.02 /bin/zsh
11402 ttys008    0:00.04 -zsh
29908 ttys010    0:00.02 /bin/zsh
31311 ttys012    0:00.02 /bin/zsh
`}
        />
        <i>this is what happened to be running on my computer at the time I made this, also this is on mac so maybe diff on Linux</i>
        <ul>
          <li>PID - unique Process ID</li>
          <li>TTY - The controlling terminal for the process</li>
          <li>TIME - The total CPU time the process has used</li>
          <li>CMD - The command that started the process</li>
        </ul>

        <p>
          <strong>TTY</strong> - this is the terminal that started a process and it stands for Teletype which used to be a physical
          device that used to interact with the computer. Now TTY refers to the terminal that provides <code>stdin</code> and <code>stdout</code>
          for a process.
        </p>

        <p><strong>Terminal Devices vs Pseudo-Terminals</strong></p>

        <p>
          So this part was honestly pretty confusing for me but I&apos;m going to try to explain this as intuitively as I can. There are
          two types of terminals you can use: a physical terminal device or a pseudo-terminal. First, we need to understand what a real
          terminal device is. A REAL terminal device is directly connected to your computer. So when you use a REAL terminal (TTY) basically that means
          whenever you type something there is a driver on the back that picks up what you say and translates that to the output. A psuedo terminal (PTY) is like
          the terminal app on your computer. This is not a real terminal but the emulation of it allows us to open multiple at the same time. If you think about it
          if a real terminal is directly connected to your keyboard you wouldn&apos;t be able to have multiple associated with your one keyboard so PTY&apos;s allow us to
          have more terminals. This is useful if you want to have multiple VSCode applications open and also other terminal processes. Think of a real terminal device
          as a real phone line plugged into the wall and a PTY as a Zoom call that acts like a phone.
        </p>

        <p>
          <strong>Controlling Terminals </strong>
          - Processes are tied to the terminal that started them. Some processes don&apos;t have a controlling terminal because they
          cannot be killed or should not be killed. Those are called <strong>daemons</strong>.

        </p>
        <p>
          Ok now lets talk about the <strong>kernel in process management</strong>. This is the part that I REALLY enjoy regarding Linux. The kernel
          manages a bunch of processes and wants to run them as efficiently as possible. So below is a general process life cycle.
          A process can find itself if any of these positions throughout its life cycle. One thing I think is super cool is that if a
          process needs user input or is performing a write operation the kernel can put it in the waiting pool and let other processes run
          while a user inputs data or while performing I/O (this is because I/O is slow). This is all for one core but modern computers have
          a lot of cores and can run multiple processes in parallel but one a singular core only one process can run at time. The kernel often
          switches so fast between processes that you can't really register that it is running multiple processes at a time.
        </p>

        <BlogImageLightbox
          src="/blog/linux-processes/process-life-cycle.png"
          alt="Process life cycle diagram"
          width={1200}
          height={900}
        />




      </section>
    </SiteShell>
  );
}
