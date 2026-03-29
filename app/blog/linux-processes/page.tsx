import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { BlogInlineRevealTerm } from "../../blog-inline-reveal-term";
import { BlogImageLightbox } from "../../blog-image-lightbox";
import { BlogViewCount } from "../../blog-view-count";
import { PStrong } from "../../blog-strong-heading";
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
            <span className="blogPostDate">Mar 29, 2026</span>
            <span className="blogPostDateHover">Last updated: Mar 29, 2026</span>
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

        <p>If we type <code>ps</code> in the terminal we get all the processes the current terminal session is running.</p>

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
        <i>This is what happened to be running on my computer at the time I made this. Also, this is on Mac, so it may be different on Linux.</i>
        <ul>
          <li><BlogInlineRevealTerm term="PID" reveal="process identifier" /> - unique Process ID</li>
          <li>TTY - The controlling terminal for the process</li>
          <li>TIME - The total CPU time the process has used</li>
          <li>CMD - The command that started the process</li>
        </ul>

        <p>
          <strong>TTY</strong> - this is the terminal that started a process and it stands for Teletype which used to be a physical
          device that used to interact with the computer. Now TTY refers to the terminal that provides <code>stdin</code> and <code>stdout</code>
          for a process.
        </p>

        <PStrong>Terminal Devices vs Pseudo-Terminals</PStrong>

        <p>
          So this part was honestly pretty confusing for me but I&apos;m going to try to explain this as intuitively as I can. There are
          two types of terminals you can use: a physical terminal device or a pseudo-terminal. First, we need to understand what a real
          terminal device is. A REAL terminal device is directly connected to your computer. So when you use a REAL terminal (TTY) basically that means
          whenever you type something there is a driver on the back that picks up what you say and translates that to the output. A pseudo terminal (PTY) is like
          the terminal app on your computer. This is not a real terminal but the emulation of it allows us to open multiple at the same time. If you think about it
          if a real terminal is directly connected to your keyboard you wouldn&apos;t be able to have multiple associated with your one keyboard so PTY&apos;s allow us to
          have more terminals. This is useful if you want to have multiple VSCode applications open and also other terminal processes. Think of a real terminal device
          as a real phone line plugged into the wall and a PTY as a Zoom call that acts like a phone.
        </p>

        <PStrong>Controlling Terminals</PStrong>
        <p>
          Processes are tied to the terminal that started them. Some processes don&apos;t have a controlling terminal because they
          cannot be killed or should not be killed. Those are called <strong>daemons</strong>.
        </p>
        <p>
          Ok now let&apos;s talk about the <strong>kernel in process management</strong>. This is the part that I REALLY enjoy regarding Linux. The kernel
          manages a bunch of processes and wants to run them as efficiently as possible. So below is a general process life cycle.
          A process can find itself if any of these positions throughout its life cycle. One thing I think is super cool is that if a
          process needs user input or is performing a write operation the kernel can put it in the waiting pool and let other processes run
          while a user inputs data or while performing I/O (this is because I/O is slow). This is all for one core but modern computers have
          a lot of cores and can run multiple processes in parallel, but on a singular core only one process can run at a time. The kernel often
          switches so fast between processes that you can&apos;t really register that it is running multiple processes at a time. All processes fight
          for system resources and the kernel schedules them all.
        </p>

        <BlogImageLightbox
          src="/blog/linux-processes/process-life-cycle.png"
          alt="Process life cycle diagram"
          width={1200}
          height={900}
        />

        <PStrong>Forking a process</PStrong>
        <p>
          So this honestly is a bit difficult to fully conceptualize until you start coding this out but I&apos;ll try to explain this in
          the best way I can and in the future I&apos;ll have a blog going through a Linux project that you can follow along with to see this in practice.
          When you run a program that is a process. So we are able to create new processes by duplicating the process inside the code. How do we do this?
          We can run the <code>fork()</code> command and create a new identical process running the same exact code we are running in the code. So say we
          have a program that prints 0-100 in the terminal and <code>fork()</code> right before. This will result in 2 processes both counting to 100. Now say
          we don&apos;t want to do this and instead we want the process to run a new program. This is where <code>execve</code> comes in. This is a command where a
          <strong> parent process</strong> forks a child process but the child process is wiped clean and restarts with a completely new program. One thing to
          really drill in is that every process has a parent process. If not then it is the <code>init</code> process.
        </p>

        <PStrong>Code!!!</PStrong>

        <p>In this block of code we can just call the <code>getpid()</code> method to get our own <BlogInlineRevealTerm term="PID" reveal="process identifier" />.</p>
        <CodeOutputBlock
          language="c"
          code={`#include <stdio.h>
#include <unistd.h>

int main()
{
    printf("Hello from PID: %d\\n", getpid());
    return 0;
}`}
          output={`Hello from PID: 93631`}
        />

        <p>
          In this block of code we can call the <code>fork</code> command to create a child process and use <code>getpid()</code>
          to get the <BlogInlineRevealTerm term="PID" reveal="process identifier" /> for both the child and parent. We can discern between the child and parent because the fork command returns
          the child process <BlogInlineRevealTerm term="PID" reveal="process identifier" /> to the parent and 0 for the child itself. Now also note what I was saying earlier about how the child
          process will duplicate the parent process and start in whatever line of code the <code>fork()</code> is called on.
        </p>

        <CodeOutputBlock
          language="c"
          code={`#include <stdio.h>
#include <unistd.h>

int main()
{
    // The fork command returns the child process PID to the parent and 0 for the child itself
    pid_t pid = fork();

    // Given what we just learned we can use that to label the processes.
    if (pid == 0)
    {
        printf("I am the child process PID: %d\\n", getpid());
    }
    else
    {
        printf("I am the parent process PID: %d. This is my child's PID: %d\\n", getpid(), pid);
    }
    return 0;
}`}
          output={`I am the parent process PID: 11141. This is my child's PID: 11142
I am the child process PID: 11142`}
        />

        <p>
          Ok now we are going to look at the <code>wait()</code> command and look at how it works. The <code>wait()</code>
          command waits until ALL child processes are completed.
        </p>

        <CodeOutputBlock
          language="c"
          code={`#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main()
{
    // The fork command returns the child process PID to the parent and 0 for the child itself
    pid_t pid = fork();

    // Given what we just learned we can use that to label the processes.
    if (pid == 0)
    {
        printf("I am the child process PID: %d\\n", getpid());
    }
    else
    {
        int status;
        pid_t child_pid = wait(&status);
        printf("I am the parent process PID: %d. This is my child's PID: %d\\n", getpid(), child_pid);
    }

    return 0;
}`}
          output={`I am the child process PID: 16770
I am the parent process PID: 16764. This is my child's PID: 16770`}
        />

        <i>
          Notice how the parent process now prints after the child process. In the previous code block it was random, but
          in this code block it will always be this way.
        </i>
        <p>
          Using <code>waitpid(pid, &status, 0)</code> we can wait for a specific child process (I won&apos;t show code for this, but
          I encourage you to use this and test it out).
        </p>

        <CodeOutputBlock
          language="c"
          code={`#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main()
{
    // The fork command returns the child process PID to the parent and 0 for the child itself
    pid_t pid = fork();

    // Given what we just learned we can use that to label the processes.
    if (pid == 0)
    {
        printf("I am the child process PID: %d\\n", getpid());

        // You can look at the exact syntax for this in c if you would like
        // For this all I really want you to see in the output is that
        // We are replacing this process memory and now running the ls -l command
        char *args[] = {"/bin/ls", "-l", NULL};
        char *env[] = {NULL};
        execve("/bin/ls", args, env);
    }
    else
    {
        int status;
        pid_t child_pid = wait(&status);
        printf("I am the parent process PID: %d. This is my child's PID: %d\\n", getpid(), child_pid);
    }

    return 0;
}`}
          output={`I am the child process PID: 28639
total 96
-rw-r--r--@ 1 aryanjain  staff   4338 Mar 28 22:47 README.md
-rwxr-xr-x  1 aryanjain  staff  33720 Mar 29 13:28 process
-rw-r--r--  1 aryanjain  staff    678 Mar 29 13:28 process.c
I am the parent process PID: 28638. This is my child's PID: 28639`}
        />
        <p>
          Breaking this down we have the same code as before with the wait but now we have this extra execve command.
          This command pretty much takes a process, wipes its memory, and gives it a whole new program. It&apos;s like brainwashing a
          process.
        </p>

        <div
          className="tenor-gif-embed blogTenorEmbed"
          data-postid="25923233"
          data-share-method="host"
          data-aspect-ratio="1.77778"
          data-width="100%"
        >
          <a href="https://tenor.com/view/no-war-in-ba-sing-se-avatar-earth-village-gif-25923233">
            No War In Ba Sing Se Avatar GIF
          </a>
          from{" "}
          <a href="https://tenor.com/search/no+war+in+ba+sing+se-gifs">No War In Ba Sing Se GIFs</a>
        </div>
        <Script src="https://tenor.com/embed.js" strategy="afterInteractive" />

        <PStrong>Orphan Processes</PStrong>
        <p>
          Now one thing I want to explicitly state is that process order is completely random. If we fork in the parent process
          10 times and have each process print something the order (to us) would be random. So this means there is a possible case
          that a parent process can terminate before a child process. In this case the child process becomes an orphan as it has no parent.
          In this case the <code>init</code> process has PID 1 and will adopt the child process. Now this also begs the question: why do we
          need to adopt a child? When we make a process it adds an entry in the <strong> process table</strong> and that entry is only freed
          when a process is reaped. Now that begs the next question: how can you reap a process to free up space in the process table?
          The only way is when the parent calls <code>wait()</code> or <code>waitpid()</code>. This is the only way a process can be freed.
          So back to the original question we need the <code> init</code> process to adopt the orphan process so it can reap it and free up space
          in the process table.
        </p>

        <PStrong>Zombie Processes</PStrong>
        <p>
          Now we move onto a related field of zombie processes. A zombie process is a process that has completely exited its program
          but is still sitting in the process table taking up space. It is a process that has finished execution but its parent has
          not called <code>wait()</code> on it yet. That&apos;s it!
        </p>

        <PStrong>Signals and <BlogInlineRevealTerm term="IPC" reveal="Inter Process Communication" /> </PStrong>
        <p>
          Sometimes processes need to communicate with each other during execution. To do this we use signals that allow processes to
          communicate with each other. If you have started a program in the terminal before you have actually used these signals before.
          The CTRL-C command is the same as the SIGINT signal. Let&apos;s look at some other signals as well as the <code>kill</code> command.
        </p>

        <CodeOutputBlock
          language="c"
          code={`#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <signal.h>

int main()
{
    // The fork command returns the child process PID to the parent and 0 for the child itself
    pid_t pid = fork();

    // Given what we just learned we can use that to label the processes.
    if (pid == 0)
    {
        printf("This is the child, i am going to print numbers until i get terminated\\n");
        int i = 0;
        while (1)
        {
            printf("%d\\n", i);
            i += 2;
            sleep(1);
        }
    }
    else
    {
        sleep(3);
        printf("I am the parent process PID: %d. This is my child's PID: %d\\n", getpid(), pid);
        kill(pid, SIGTERM);
        wait(NULL);
        printf("I am the parent and now the child is terminated and reaped");
    }

    return 0;
}`}
          output={`This is the child, i am going to print numbers until i get terminated
0
2
4
I am the parent process PID: 44822. This is my child's PID: 44836
I am the parent and now the child is terminated and reaped%`}
        />
        <i>The exact timing and numbers depend on each run. Also note that SIGTERM is equal to the number 15.</i>
        <p>Below are other signals that are good to know: </p>
        <ul>
          <li><strong>SIGTERM</strong> - asks a process to terminate gracefully</li>
          <li><strong>SIGKILL</strong> - force kills a process immediately</li>
          <li><strong>SIGINT</strong> - interrupt signal, usually what happens with CTRL-C</li>
          <li><strong>SIGSTOP</strong> - pauses a process</li>
          <li><strong>SIGCONT</strong> - resumes a stopped process</li>
          <li><strong>SIGSEGV</strong> - segmentation fault, usually from invalid memory access</li>
          <li><strong>SIGHUP</strong> - historically meant hang up, now often used to reload a process</li>
        </ul>

      </section>
    </SiteShell>
  );
}
