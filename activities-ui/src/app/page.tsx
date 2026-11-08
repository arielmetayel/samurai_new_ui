"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Bookmark,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Folder,
  Link as LinkIcon,
  Tool,
  Truck,
} from "react-feather";
import ActivityDetailSidePanel from "./activities/ActivityDetailSidePanel";
import CreateNewPopup from "./activities/CreateNewPopup";
import { getActivityById, mockActivities } from "./activities/data";
import { Activity } from "@/types";
import { useI18n } from "@/i18n";
import { StatusChip, statusColor } from "@/design-system";
import AppShell from "./AppShell";
import styles from "./page.module.css";

type CardTone = "green" | "orange" | "red";
type ActivityIcon = "truck" | "link" | "tool" | "briefcase";

type DashboardCard = {
  id: string;
  activityId: string;
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
  activityId: string;
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
    activityId: "1",
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
    activityId: "6",
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
    activityId: "4",
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
    activityId: "7",
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
    activityId: "8",
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
    activityId: "9",
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
    activityId: "10",
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
    activityId: "11",
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
    activityId: "5",
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
    activityId: "3",
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
    activityId: "12",
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
    activityId: "1",
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
    activityId: "4",
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
    activityId: "9",
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
    activityId: "13",
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
    activityId: "10",
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
    activityId: "5",
    project: "Event Masters",
    type: "Fixes",
    date: "22/03",
    time: "13:00",
    status: "In Progress",
    icon: "tool",
    assignee: "ST",
  },
];

function greetingFor(hour: number, t: ReturnType<typeof useI18n>["t"]) {
  if (hour < 12) return t("home.morning");
  if (hour < 18) return t("home.afternoon");
  return t("home.evening");
}

function formatHeaderDate(date: Date, locale: string) {
  return date.toLocaleDateString(locale === "he" ? "he-IL" : "en-GB", {
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

function CarouselCard({ card, onOpen }: { card: DashboardCard; onOpen: (id: string) => void }) {
  const { localize } = useI18n();
  return (
    <button
      type="button"
      onClick={() => onOpen(card.activityId)}
      className={styles.card}
    >
      <div className={styles.cardTop}>
        <span className={styles.cardIcon}>
          <ActivityGlyph icon={card.icon} size={16} />
        </span>
        <span className={styles.cardDate}>{card.dateLabel}</span>
      </div>
      <div className={styles.cardType}>{localize(card.type)}</div>
      <div className={styles.cardTitle}>{card.project}</div>
      <div className={styles.cardBottom}>
        <StatusChip color={statusColor(card.status)} className={styles.statusChip}>
          {localize(card.status)}
        </StatusChip>
        <div className={styles.cardPeople}>
          {card.assignees.map((initials) => (
            <span key={initials} className={styles.personBadge}>
              {initials}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function ActivityRow({ row, onOpen }: { row: DashboardRow; onOpen: (id: string) => void }) {
  const { localize } = useI18n();
  return (
    <button
      type="button"
      onClick={() => onOpen(row.activityId)}
      className={styles.listRow}
      data-status={row.status}
    >
      <span className={styles.rowIcon}>
        <ActivityGlyph icon={row.icon} size={16} />
      </span>
      <div className={styles.rowWhen}>
        <span>{row.date}</span>
        <span>{row.time}</span>
      </div>
      <div className={styles.rowBody}>
        <div className={styles.rowTitle}>{row.project}</div>
        <div className={styles.rowSub}>{localize(row.type)}</div>
      </div>
      <StatusChip color={statusColor(row.status)} className={styles.statusChip}>
        {localize(row.status)}
      </StatusChip>
      <span className={styles.rowAssignee}>{row.assignee}</span>
    </button>
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
  const { t, dir } = useI18n();
  const Chevron = dir === "rtl" ? ChevronLeft : ChevronRight;
  return (
    <div className={styles.sectionHead}>
      <span className={styles.sectionIcon}>{icon}</span>
      <h2>
        {title}
        <span className={styles.countPill}>{count}</span>
      </h2>
      <Link href={href} className={styles.sectionMore}>
        {t("home.viewAll")}
        <Chevron size={16} />
      </Link>
    </div>
  );
}

export default function Home() {
  const { t, locale } = useI18n();
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  function openActivity(id: string) {
    const activity = getActivityById(id);
    if (activity) setSelectedActivity(activity);
  }
  const toReviewCount =
    myOpenActivities.filter((a) => a.tone === "orange").length +
    pinnedActivities.filter((a) => a.status === "Overdue").length;

  return (
    <AppShell
      title={t("nav.home")}
      showBack={false}
      headerExtra={now ? formatHeaderDate(now, locale) : ""}
      onCreateNew={() => setIsCreatePopupOpen(true)}
      contentClassName={styles.main}
    >
        <div className={styles.hero}>
          <div>
            <p className={styles.kicker}>{now ? greetingFor(now.getHours(), t) : t("home.hello")}</p>
            <h2 className={styles.pageTitle}>{t("home.dashboard")}</h2>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{myOpenActivities.length}</span>
            <span className={styles.statLabel}>{t("home.openActivities")}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{toReviewCount}</span>
            <span className={styles.statLabel}>{t("home.needReview")}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{pinnedActivities.length}</span>
            <span className={styles.statLabel}>{t("home.pinnedOverdue")}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{todayActivities.length}</span>
            <span className={styles.statLabel}>{t("home.scheduledToday")}</span>
          </div>
        </div>

        <div className={styles.listsGrid}>
          <section className={styles.listSection}>
            <SectionHead
              icon={<Calendar size={16} />}
              title={t("home.today")}
              count={todayActivities.length}
              href="/activities"
            />
            <div className={styles.list}>
              {todayActivities.map((row) => (
                <ActivityRow key={row.id} row={row} onOpen={openActivity} />
              ))}
            </div>
          </section>

          <section className={styles.listSection}>
            <SectionHead
              icon={<AlertCircle size={16} />}
              title={t("home.tomorrow")}
              count={tomorrowActivities.length}
              href="/activities"
            />
            <div className={styles.list}>
              {tomorrowActivities.map((row) => (
                <ActivityRow key={row.id} row={row} onOpen={openActivity} />
              ))}
            </div>
          </section>
        </div>

        <section className={styles.carouselSection}>
          <SectionHead
            icon={<Clock size={16} />}
            title={t("home.myOpen")}
            count={myOpenActivities.length}
            href="/activities"
          />
          <div className={styles.carousel}>
            {myOpenActivities.map((card) => (
              <CarouselCard key={card.id} card={card} onOpen={openActivity} />
            ))}
          </div>
        </section>

        <section className={styles.carouselSection}>
          <SectionHead
            icon={<Folder size={16} />}
            title={t("home.projectOpen")}
            count={projectActivities.length}
            href="/activities"
          />
          <div className={styles.carousel}>
            {projectActivities.map((card) => (
              <CarouselCard key={card.id} card={card} onOpen={openActivity} />
            ))}
          </div>
        </section>

        <section className={styles.carouselSection}>
          <SectionHead
            icon={<Bookmark size={16} />}
            title={t("home.pinned")}
            count={pinnedActivities.length}
            href="/activities"
          />
          <div className={styles.carousel}>
            {pinnedActivities.map((card) => (
              <CarouselCard key={card.id} card={card} onOpen={openActivity} />
            ))}
          </div>
        </section>

      <CreateNewPopup
        isOpen={isCreatePopupOpen}
        onClose={() => setIsCreatePopupOpen(false)}
      />

      <ActivityDetailSidePanel
        activity={selectedActivity}
        activities={[...mockActivities].sort((a, b) => a.dateTime.localeCompare(b.dateTime))}
        isOpen={Boolean(selectedActivity)}
        onClose={() => setSelectedActivity(null)}
        onSelect={(activity) => setSelectedActivity(activity)}
      />
    </AppShell>
  );
}
