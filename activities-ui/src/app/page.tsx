"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/design-system";
import {
  AlertCircle,
  Bookmark,
  Briefcase,
  Calendar,
  ChevronRight,
  Clock,
  Folder,
  Link as LinkIcon,
  Tool,
  Truck,
} from "react-feather";
import CreateNewPopup from "./activities/CreateNewPopup";
import { NavLabel, navItems } from "./navItems";
import styles from "./page.module.css";

type CardTone = "green" | "orange" | "red";
type ActivityIcon = "truck" | "link" | "tool" | "briefcase";

type DashboardCard = {
  id: string;
  project: string;
  type: string;
  dateLabel: string;
  status: string;
  location?: string;
  tone: CardTone;
  icon: ActivityIcon;
  assignees: string[];
};

type DashboardRow = {
  id: string;
  project: string;
  type: string;
  date: string;
  time: string;
  status: string;
  icon: ActivityIcon;
  assignee: string;
};

const myOpenActivities: DashboardCard[] = [
  {
    id: "open-1",
    project: "FoodChain Suppliers",
    type: "Support Case",
    dateLabel: "21/03/25  12:00",
    status: "In Progress",
    location: "Ashdod",
    tone: "green",
    icon: "link",
    assignees: ["AB", "CD"],
  },
  {
    id: "open-2",
    project: "Event Masters",
    type: "Meeting Summary",
    dateLabel: "21/03/25  12:00",
    status: "To Review",
    location: "Tel Aviv",
    tone: "orange",
    icon: "link",
    assignees: ["GH"],
  },
  {
    id: "open-3",
    project: "Legal Pro Consulting",
    type: "Phase Execution",
    dateLabel: "21/03/25  12:00",
    status: "In Progress",
    location: "Holon",
    tone: "green",
    icon: "truck",
    assignees: ["QR", "ST"],
  },
  {
    id: "open-4",
    project: "Ichilov North",
    type: "Site Visit",
    dateLabel: "21/03/25  14:30",
    status: "To Review",
    location: "Tel Aviv",
    tone: "orange",
    icon: "tool",
    assignees: ["MK"],
  },
];

const projectActivities: DashboardCard[] = [
  {
    id: "proj-1",
    project: "Yuvalim Ganim",
    type: "Support Case",
    dateLabel: "21/03/25  12:00",
    status: "Confirmed",
    location: "Jerusalem",
    tone: "green",
    icon: "link",
    assignees: ["DL", "RS"],
  },
  {
    id: "proj-2",
    project: "HaGiborim",
    type: "Maintenance",
    dateLabel: "21/03/25  12:00",
    status: "In Progress",
    location: "Bat Yam",
    tone: "green",
    icon: "link",
    assignees: ["RS"],
  },
  {
    id: "proj-3",
    project: "Dania Sibus",
    type: "Installation",
    dateLabel: "21/03/25  12:00",
    status: "Confirmed",
    location: "Ramat Efal",
    tone: "green",
    icon: "truck",
    assignees: ["AV", "TK"],
  },
  {
    id: "proj-4",
    project: "Ariel Gabay",
    type: "Office Hours",
    dateLabel: "21/03/25  16:00",
    status: "In Progress",
    location: "Dubnov 3",
    tone: "green",
    icon: "briefcase",
    assignees: ["MK"],
  },
];

const pinnedActivities: DashboardCard[] = [
  {
    id: "pin-1",
    project: "Event Masters",
    type: "Fixes",
    dateLabel: "21/03/25  12:00",
    status: "Overdue",
    location: "Netanya",
    tone: "red",
    icon: "truck",
    assignees: ["ST"],
  },
  {
    id: "pin-2",
    project: "FoodChain Suppliers",
    type: "To Review",
    dateLabel: "21/03/25  12:00",
    status: "Overdue",
    location: "Ashdod",
    tone: "red",
    icon: "truck",
    assignees: ["IJ", "KL"],
  },
  {
    id: "pin-3",
    project: "HaDam Bank",
    type: "Contract Check",
    dateLabel: "21/03/25  12:00",
    status: "Pinned",
    location: "Ramat Gan",
    tone: "red",
    icon: "briefcase",
    assignees: ["DL"],
  },
];

const todayActivities: DashboardRow[] = [
  {
    id: "today-1",
    project: "FoodChain Suppliers",
    type: "Support Case",
    date: "21/03",
    time: "12:00",
    status: "In Progress",
    icon: "truck",
    assignee: "AB",
  },
  {
    id: "today-2",
    project: "Legal Pro Consulting",
    type: "Phase Execution",
    date: "21/03",
    time: "12:00",
    status: "Confirmed",
    icon: "briefcase",
    assignee: "QR",
  },
  {
    id: "today-3",
    project: "HaGiborim Bat Yam",
    type: "Maintenance",
    date: "21/03",
    time: "12:00",
    status: "In Progress",
    icon: "tool",
    assignee: "RS",
  },
];

const tomorrowActivities: DashboardRow[] = [
  {
    id: "tom-1",
    project: "Yuvalim Ganim",
    type: "Site Visit",
    date: "22/03",
    time: "08:30",
    status: "Confirmed",
    icon: "truck",
    assignee: "DL",
  },
  {
    id: "tom-2",
    project: "Dania Sibus",
    type: "Installation",
    date: "22/03",
    time: "10:00",
    status: "To Review",
    icon: "briefcase",
    assignee: "AV",
  },
  {
    id: "tom-3",
    project: "Event Masters",
    type: "Fixes",
    date: "22/03",
    time: "13:00",
    status: "In Progress",
    icon: "tool",
    assignee: "ST",
  },
];

function greetingFor(date: Date) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatHeaderDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ActivityGlyph({ icon, size = 18 }: { icon: ActivityIcon; size?: number }) {
  const props = { size, strokeWidth: 2 };
  if (icon === "truck") return <Truck {...props} />;
  if (icon === "link") return <LinkIcon {...props} />;
  if (icon === "tool") return <Tool {...props} />;
  return <Briefcase {...props} />;
}

function statusClass(status: string) {
  if (status === "To Review") return styles.statusReview;
  if (status === "Confirmed") return styles.statusConfirmed;
  if (status === "Overdue" || status === "Pinned") return styles.statusOverdue;
  return styles.statusProgress;
}

function CarouselCard({ card }: { card: DashboardCard }) {
  return (
    <Link href="/activities" className={`${styles.card} ${styles[`tone_${card.tone}`]}`}>
      <div className={styles.cardTop}>
        <span className={styles.cardIcon}>
          <ActivityGlyph icon={card.icon} size={16} />
        </span>
        <span className={styles.cardDate}>{card.dateLabel}</span>
      </div>
      <div className={styles.cardType}>{card.type}</div>
      <div className={styles.cardTitle}>{card.project}</div>
      <div className={styles.cardBottom}>
        <span className={`${styles.statusChip} ${statusClass(card.status)}`}>{card.status}</span>
        <div className={styles.cardPeople}>
          {card.assignees.map((initials) => (
            <span key={initials} className={styles.personBadge}>
              {initials}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function ActivityRow({ row }: { row: DashboardRow }) {
  return (
    <Link href="/activities" className={styles.listRow} data-status={row.status}>
      <span className={styles.rowIcon}>
        <ActivityGlyph icon={row.icon} size={16} />
      </span>
      <div className={styles.rowWhen}>
        <span>{row.date}</span>
        <span>{row.time}</span>
      </div>
      <div className={styles.rowBody}>
        <div className={styles.rowTitle}>{row.project}</div>
        <div className={styles.rowSub}>{row.type}</div>
      </div>
      <span className={`${styles.statusChip} ${statusClass(row.status)}`}>{row.status}</span>
      <span className={styles.rowAssignee}>{row.assignee}</span>
    </Link>
  );
}

function SectionHead({
  icon,
  title,
  count,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
  href: string;
}) {
  return (
    <div className={styles.sectionHead}>
      <span className={styles.sectionIcon}>{icon}</span>
      <h2>
        {title}
        <span className={styles.countPill}>{count}</span>
      </h2>
      <Link href={href} className={styles.sectionMore}>
        View all
        <ChevronRight size={16} />
      </Link>
    </div>
  );
}

export default function Home() {
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const now = useMemo(() => new Date(), []);
  const toReviewCount =
    myOpenActivities.filter((a) => a.tone === "orange").length +
    pinnedActivities.filter((a) => a.status === "Overdue").length;

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.topHeader}>
        <div className={styles.topHeaderContent}>
          <h1 className={styles.topHeaderTitle}>Home</h1>
          <span className={styles.headerDate}>{formatHeaderDate(now)}</span>
        </div>
      </header>

      <aside className={styles.sidebar}>
        <div className={styles.userBlock}>
          <div className={styles.avatar}>UF</div>
          <div className={styles.userName}>User Full Name</div>
        </div>
        <nav className={styles.menu}>
          {navItems.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={item.label === "Home" ? styles.menuItemActive : styles.menuItem}
              >
                <NavLabel item={item} />
              </Link>
            ) : (
              <div key={item.label} className={styles.menuItem}>
                <NavLabel item={item} />
              </div>
            )
          )}
        </nav>
        <div className={styles.createWrap}>
          <Button
            variant="primary"
            size="md"
            className={styles.createBtn}
            onClick={() => setIsCreatePopupOpen(true)}
          >
            + Create New
          </Button>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.hero}>
          <div>
            <p className={styles.kicker}>{greetingFor(now)}</p>
            <h2 className={styles.pageTitle}>Your dashboard</h2>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{myOpenActivities.length}</span>
            <span className={styles.statLabel}>Open activities</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{toReviewCount}</span>
            <span className={styles.statLabel}>Need review</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{pinnedActivities.length}</span>
            <span className={styles.statLabel}>Pinned / overdue</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{todayActivities.length}</span>
            <span className={styles.statLabel}>Scheduled today</span>
          </div>
        </div>

        <section className={styles.carouselSection}>
          <SectionHead
            icon={<Clock size={16} />}
            title="My Open Activities"
            count={myOpenActivities.length}
            href="/activities"
          />
          <div className={styles.carousel}>
            {myOpenActivities.map((card) => (
              <CarouselCard key={card.id} card={card} />
            ))}
          </div>
        </section>

        <section className={styles.carouselSection}>
          <SectionHead
            icon={<Folder size={16} />}
            title="Open activities in my projects"
            count={projectActivities.length}
            href="/activities"
          />
          <div className={styles.carousel}>
            {projectActivities.map((card) => (
              <CarouselCard key={card.id} card={card} />
            ))}
          </div>
        </section>

        <section className={styles.carouselSection}>
          <SectionHead
            icon={<Bookmark size={16} />}
            title="My Pinned activities"
            count={pinnedActivities.length}
            href="/activities"
          />
          <div className={styles.carousel}>
            {pinnedActivities.map((card) => (
              <CarouselCard key={card.id} card={card} />
            ))}
          </div>
        </section>

        <div className={styles.listsGrid}>
          <section className={styles.listSection}>
            <SectionHead
              icon={<Calendar size={16} />}
              title="Today's Activities"
              count={todayActivities.length}
              href="/activities"
            />
            <div className={styles.list}>
              {todayActivities.map((row) => (
                <ActivityRow key={row.id} row={row} />
              ))}
            </div>
          </section>

          <section className={styles.listSection}>
            <SectionHead
              icon={<AlertCircle size={16} />}
              title="Tomorrow's Activities"
              count={tomorrowActivities.length}
              href="/activities"
            />
            <div className={styles.list}>
              {tomorrowActivities.map((row) => (
                <ActivityRow key={row.id} row={row} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <CreateNewPopup
        isOpen={isCreatePopupOpen}
        onClose={() => setIsCreatePopupOpen(false)}
      />
    </div>
  );
}
