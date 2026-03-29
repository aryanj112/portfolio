import type { Metadata } from "next";
import { BlogInlineRevealTerm } from "../../blog-inline-reveal-term";
import { PStrong } from "../../blog-strong-heading";
import { BlogViewCount } from "../../blog-view-count";
import { CodeBlock } from "../../code-block";
import { CodeOutputBlock } from "../../code-output-block";
import { PaintLink } from "../../paint-link";
import { SiteShell } from "../../components";

export const metadata: Metadata = {
  title: "Linux Basics",
};

export default function LinuxBasicsPage() {
  return (
    <SiteShell>
      <section className="blogPostShell">
        <h1>Linux Basics</h1>
        <div className="blogPostMetaRow">
          <p className="blogByline">By: Aryan Jain</p>
          <span className="blogPostDateReveal" tabIndex={0}>
            <span className="blogPostDate">Mar 25, 2026</span>
            <span className="blogPostDateHover">Last updated: Mar 25, 2026</span>
          </span>
          <BlogViewCount slug="linux-basics" />
        </div>

        <CodeBlock
          language="bash"
          code={`
echo "HEY GUYS WELCOME TO MY FIRST LINUX BLOG"            
            `}
        />

        <p>
          Linux is something I&apos;ve always been around but never fully learned. If you&apos;re anything like me you probably love coding
          and want to start going down to the more hardware level and thought that Linux would be a cool introduction.
          Without further ado, let&apos;s get started!
        </p>

        <PStrong>History:</PStrong>
        <p>
          In 1969 Ken Thompson and Dennis Ritchie made something called the
          <BlogInlineRevealTerm term="UNIX" reveal="UNiplexed Information and Computing System" />
          operating system. Later Richard Stallman made
          <BlogInlineRevealTerm term="GNU" reveal="a recursive acronym for GNU's Not UNIX" />
          which
          was based on UNIX but completely open source. It wanted to have a kernel but was unable to complete it in time.
          Which now begs the question: what is the kernel?
        </p>

        <PStrong>What is the Kernel?</PStrong>
        <p>The kernel can control:</p>
        <ul>
          <li>CPU</li>
          <li>memory</li>
          <li>peripheral devices</li>
          <li>AND MORE</li>
        </ul>
        <p>
          The kernel was made by Linus Torvalds which was called the Linux kernal. When GNU and the Linux kernel were combined
          that created what most people call Linux now (note that Linux does actually only refer to the kernel). Anything that
          uses a Linux kernel is a Linux distribution or &quot;distro&quot;.
        </p>

        <p>Different Distros</p>

        <ul>
          <li>Debian</li>
          <ul>
            <li>Open Source and Free</li>
            <li>
              Uses
              <BlogInlineRevealTerm term="apt" reveal="advanced package library" />
              package manager
            </li>
          </ul>
          <li>Red Hat Enterprise Linux</li>
          <ul>
            <li>Used for enterprise commercial applications</li>
          </ul>
          <li>Ubuntu</li>
          <ul>
            <li>Build on Debian</li>
            <li>
              Uses
              <BlogInlineRevealTerm term="apt" reveal="advanced package library" />
              package manager
            </li>
            <li>Easy to use and good for beginners</li>
          </ul>
          <li>Fedora</li>
          <ul><li>Open source and free version of Red Hat</li></ul>
          <li>Arch Linux</li>
          <ul><li>Lightweight and very bare-bones, so you will learn a lot of Linux from it</li></ul>
          <li>MANY MORE</li>
        </ul>

        <PStrong>The Shell</PStrong>
        <p>
          The shell is how we can type commands and have them executed on the operating system. Think of a command as no
          different than one you would give to your sibling or friend. If you ask your sister to give you a glass of water
          that is no different from us asking the operating system to ping an ip address. By using a
          <BlogInlineRevealTerm term="GUI" reveal="graphical user interface" />
          we can open a shell session via applications like &quot;Terminal&quot; or &quot;Console&quot;.
        </p>

        <p>We are going to really dive into the
          <BlogInlineRevealTerm term="Bash" reveal="Bourne Again Shell" /> application (note there are others such as the Zsh shell that Mac uses). Typically the line will start
          with a $ which indicates that the shell is ready to accept commands.
        </p>

        <PStrong>echo</PStrong>
        <p>this command just prints out whatever you input after</p>
        <CodeOutputBlock
          language="bash"
          code={`echo "Hello World!"`}
          output={`Hello World!`}
        />

        <PStrong>
          <BlogInlineRevealTerm term="pwd" reveal="print working directory" pad={false} />
        </PStrong>
        <p>this command just prints out the current working directory</p>
        <CodeOutputBlock
          language="bash"
          code={`pwd`}
          output={`/Users/aryanjain/Projects/kuiper-dashboard/infra`}
        />
        <i>This is an example from my terminal, but this will just print wherever you are.</i>

        <PStrong>
          <BlogInlineRevealTerm term="cd" reveal="change directory" pad={false} />
        </PStrong>
        <p>this command is used to change the directory you are in</p>
        <ul>
          <li>
            cd . (current directory)
          </li>
          <li>
            cd .. (go back one folder)
          </li>
          <li>
            cd ~ (home directory)
          </li>
          <li>
            cd - (the previous directory)
          </li>
        </ul>

        <p>
          Hey so honestly there are a lot of different commands I am learning these from
          <PaintLink href="https://labex.io/lesson/list-directories-ls-command">here</PaintLink>
          so I would look over that for all of them. I am now going to just go over a couple that I didn&apos;t know previously.
        </p>
        <p>
          In Linux we can have a file called &quot;banana.png&quot; and it doesn&apos;t have to actually be a png so we can use the file
          command to see what file type banana.png is!
        </p>
        <p>
          The difference between less and cat: cat you can look at a file and it will display the whole file. Less you
          can look at chunks. cat puts the whole file into the buffer and will scroll you to the very bottom of the file that
          is printed out in the terminal so if it is a super long file I would recommend less. less also allows you to search
          by using / (whatever you want to search for) and you can go to the next occurrences by pressing n and the previous ones by pressing N.
        </p>

        <ul>
          <li>
            <strong>history</strong> - just the history of your commands
          </li>
          <li>
            <strong>cp</strong> - copies a file to a location
          </li>
          <li>
            <strong>mv</strong> - moves a file to a location
          </li>
        </ul>

        <CodeBlock
          language="bash"
          code={`cp text.txt ./data/text
mv other_text.txt ./data/text/more`}
        />
        <p>
          the
          <BlogInlineRevealTerm term="man" reveal="manual" />
          command is used to learn more about a command. whatis is a short one-line version of man.
        </p>
        <CodeBlock
          language="bash"
          code={`man ls
man cd
whatis cat`}
        />
        <p>
          <strong>stdout</strong> when you print stuff the stdout is where that information goes. To redirect that flow you can use
          either <code>&gt;</code> or <code>&gt;&gt;</code>.
        </p>

        <CodeBlock
          language="bash"
          code={`echo "Hello World" > cat.txt
echo "using the >> appends to the file instead of deleting it" >> cat.txt`}
        />

        <p>
          <strong>stdin</strong> - by default Bash gets its input from your keyboard, but we can make it so it takes input from
          a file source.
        </p>

        <CodeBlock
          language="bash"
          code={`cat < cat.txt`}
        />
        <i>The cat command takes in stdin, so now we are redirecting it to look in cat.txt for what to input into the command.</i>

        <p>
          <strong>pipe</strong> - the pipe command (|) is used to take the stdout of one command as the stdin to another. This command
          is used to link together commands such that we can develop stronger more powerful outcomes.
        </p>

        <CodeBlock
          language="bash"
          code={`ls -la /etc | less`}
        />
        <i>The first command is fed into the less command. BOOM.</i>

        <PStrong>
          <BlogInlineRevealTerm
            term="grep"
            reveal="Global Regular Expression (if you take upper level CS classes at a university or if you know about regular expressions this term makes a lot of sense)"
            pad={false}
          />
        </PStrong>
        <p>this is used to match a pattern in a file or find text in files.</p>

        <CodeBlock
          language="bash"
          code={`grep fox sample.txt`}
        />

        <PStrong>FINAL REMARKS</PStrong>
        <p>
          I used this blog mainly as a notes tab for myself so while I hope it was useful I do recognize that this isn&apos;t the best way
          to learn Linux. I think that you should
          <PaintLink href="https://labex.io/linuxjourney">look at this resource</PaintLink>
          which is where I learned. Also as you develop as a CS student
          and developer you learn most of this stuff along the way. I would say the main thing you should learn is a general idea of what
          these commands do and then know what is the best command you need to research more to achieve what you need.
        </p>
      </section>
    </SiteShell>
  );
}
