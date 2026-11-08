"use client";

import { useState } from "react";
import { Plus, Search, Trash2 } from "react-feather";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Drawer,
  Field,
  Modal,
  Overlay,
  Select,
  StatusChip,
  Table,
  TableHeader,
  TableRow,
  TableRowBody,
  TextArea,
  TextInput,
  envStatus,
  radius,
  semantic,
  space,
  statusAccent,
  statusColor,
  typeScale,
} from "@/design-system";
import AppShell from "../AppShell";
import styles from "./catalog.module.css";

const semanticSwatches: { name: string; cssVar: string; hex: string }[] = [
  { name: "primary", cssVar: "--color-primary", hex: semantic.color.primary },
  { name: "primary-hover", cssVar: "--color-primary-hover", hex: semantic.color.primaryHover },
  { name: "primary-soft", cssVar: "--color-primary-soft", hex: semantic.color.primarySoft },
  { name: "text", cssVar: "--color-text", hex: semantic.color.text },
  { name: "text-secondary", cssVar: "--color-text-secondary", hex: semantic.color.textSecondary },
  { name: "text-muted", cssVar: "--color-text-muted", hex: semantic.color.textMuted },
  { name: "canvas", cssVar: "--color-canvas", hex: semantic.color.canvas },
  { name: "surface", cssVar: "--color-surface", hex: semantic.color.surface },
  { name: "success", cssVar: "--color-success", hex: semantic.color.success },
  { name: "warning", cssVar: "--color-warning", hex: semantic.color.warning },
  { name: "danger", cssVar: "--color-danger", hex: semantic.color.danger },
  { name: "border", cssVar: "--color-border", hex: semantic.color.border },
];

const liveChips = [
  { label: "בתהליך", status: "In Progress" },
  { label: "נבדק", status: "Tested" },
  { label: "לעיון", status: "To Review" },
  { label: "מאושר", status: "Confirmed" },
  { label: "בוצע", status: "Done" },
  { label: "באיחור", status: "Overdue" },
  { label: "נעוץ", status: "Pinned" },
];

const typeRows: { key: keyof typeof typeScale; sample: string }[] = [
  { key: "avatar", sample: "אב" },
  { key: "caption", sample: "כיתוב משני" },
  { key: "sm", sample: "טקסט גוף קטן" },
  { key: "md", sample: "טקסט גוף" },
  { key: "lg", sample: "כותרת קטנה" },
  { key: "xl", sample: "כותרת ביניים" },
  { key: "2xl", sample: "כותרת מסך" },
];

function Swatch({ name, cssVar, hex }: { name: string; cssVar: string; hex: string }) {
  return (
    <div className={styles.swatch}>
      <div className={styles.swatchChip} style={{ background: `var(${cssVar})` }} />
      <div className={styles.swatchMeta}>
        <span className={styles.swatchName}>{name}</span>
        <span className={styles.swatchValue}>{cssVar}</span>
        <span className={styles.swatchValue}>{hex}</span>
      </div>
    </div>
  );
}

export default function DesignSystemCatalogPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEnv, setSelectedEnv] = useState<string>("open");
  const [checked, setChecked] = useState(true);

  return (
    <AppShell title="מערכת עיצוב" showBack={false}>
      <div className={styles.main}>
        <p className={styles.note}>
          קטלוג חי של הטוקנים והקומפוננטות. מסכי הרשימה מתחברים לטבלה; עמודות
          נשארות של כל מסך.
        </p>
        <nav className={styles.toc} aria-label="תוכן הקטלוג">
          <a href="#color">צבע</a>
          <a href="#type">טיפוגרפיה</a>
          <a href="#space">מרווח ורדיוס</a>
          <a href="#button">כפתור</a>
          <a href="#checkbox">צ׳קבוקס</a>
          <a href="#status">סטטוס</a>
          <a href="#field">שדה</a>
          <a href="#card">כרטיס</a>
          <a href="#table">טבלה</a>
          <a href="#overlay">שכבת-על</a>
        </nav>

        <section className={styles.section} id="color">
          <h2>צבע</h2>
          <p className={styles.note}>סמנטי — מה שהמסכים צורכים. המותג הוא primary #0082C8.</p>
          <div className={styles.swatches}>
            {semanticSwatches.map((swatch) => (
              <Swatch key={swatch.cssVar} {...swatch} />
            ))}
          </div>
        </section>

        <section className={styles.section} id="type">
          <h2>טיפוגרפיה</h2>
          <p className={styles.note}>Rubik. סולם: 9 / 12 / 14 / 16 / 18 / 22 / 24.</p>
          <div className={styles.typeList}>
            {typeRows.map((row) => (
              <div key={row.key} className={styles.typeRow}>
                <span className={styles.typeSample} style={{ fontSize: typeScale[row.key] }}>
                  {row.sample}
                </span>
                <span className={styles.typeMeta}>
                  {row.key} · {typeScale[row.key]}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="space">
          <h2>מרווח ורדיוס</h2>
          <h3>מרווח</h3>
          <div className={styles.spaceRow}>
            {Object.entries(space).map(([key, value]) => (
              <div key={key} className={styles.spaceItem}>
                <div className={styles.spaceBar} style={{ width: value }} />
                <span className={styles.caption}>
                  {key} · {value}
                </span>
              </div>
            ))}
          </div>
          <h3>רדיוס</h3>
          <div className={styles.radiusRow}>
            {Object.entries(radius).map(([key, value]) => (
              <div key={key} className={styles.radiusItem}>
                <div className={styles.radiusBox} style={{ borderRadius: value }} />
                <span className={styles.caption}>
                  {key} · {value}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="button">
          <h2>כפתור</h2>
          <p className={styles.note}>
            create = גלולה 48px. action = ריבוע 40×12. danger = אותו מבנה כמו
            tertiary, טקסט אדום בלי מילוי.
          </p>
          <div className={styles.row}>
            <Button variant="primary" shape="create" icon={Plus}>
              יצירה חדשה
            </Button>
            <Button variant="primary" shape="action">
              שמור הכל
            </Button>
            <Button variant="secondary">משני</Button>
            <Button variant="tertiary">שלישי</Button>
            <Button variant="ghost">שקוף</Button>
            <Button variant="danger" icon={Trash2}>
              מחיקה
            </Button>
            <Button variant="primary" shape="action" loading>
              טוען
            </Button>
            <Button variant="primary" shape="action" disabled>
              כבוי
            </Button>
            <Button variant="tertiary" size="sm">
              קטן
            </Button>
          </div>
        </section>

        <section className={styles.section} id="checkbox">
          <h2>צ׳קבוקס</h2>
          <div className={styles.checkRow}>
            <div className={styles.checkItem}>
              <Checkbox checked={false} onChange={() => undefined} />
              <span className={styles.caption}>ריק</span>
            </div>
            <div className={styles.checkItem}>
              <Checkbox checked={checked} onChange={setChecked} />
              <span className={styles.caption}>לחיצה</span>
            </div>
            <div className={styles.checkItem}>
              <Checkbox checked disabled />
              <span className={styles.caption}>כבוי</span>
            </div>
            <div className={styles.checkItem}>
              <Checkbox size="sm" checked onChange={() => undefined} />
              <span className={styles.caption}>sm</span>
            </div>
            <div className={styles.checkItem}>
              <Checkbox size="lg" checked onChange={() => undefined} />
              <span className={styles.caption}>lg</span>
            </div>
          </div>
        </section>

        <section className={styles.section} id="status">
          <h2>תג סטטוס</h2>
          <p className={styles.note}>
            חי במסכים (--status-* ודגלי danger). קטלוג סביבה (--env-status-*) עדיין
            לא מחובר למסכים.
          </p>
          <h3>חי במסכים</h3>
          <div className={styles.chips}>
            {liveChips.map((chip) => (
              <StatusChip key={chip.status} color={statusColor(chip.status)}>
                {chip.label}
              </StatusChip>
            ))}
          </div>
          <h3>קטלוג סביבה — לחיצה בוחרת</h3>
          <div className={styles.chips}>
            {Object.entries(envStatus).map(([key, status]) => (
              <StatusChip
                key={key}
                color={`var(${status.cssVar})`}
                selected={selectedEnv === key}
                onClick={() => setSelectedEnv(key)}
              >
                {status.he}
              </StatusChip>
            ))}
          </div>
        </section>

        <section className={styles.section} id="field">
          <h2>שדה</h2>
          <div className={styles.grid}>
            <Field label="חיפוש" htmlFor="ds-search">
              <TextInput id="ds-search" placeholder="חיפוש עובד..." />
            </Field>
            <Field label="סוג" htmlFor="ds-select">
              <Select id="ds-select" defaultValue="">
                <option value="" disabled>
                  בחירה
                </option>
                <option value="maintenance">תחזוקה</option>
                <option value="install">התקנה</option>
                <option value="visit">ביקור באתר</option>
                <option value="office">שעות משרד</option>
              </Select>
            </Field>
            <Field label="הערה" error="שדה חובה" htmlFor="ds-error">
              <TextInput id="ds-error" invalid placeholder="חסר ערך" />
            </Field>
            <Field label="תיאור" hint="עד 200 תווים" htmlFor="ds-area">
              <TextArea id="ds-area" placeholder="פירוט" />
            </Field>
          </div>
        </section>

        <section className={styles.section} id="card">
          <h2>כרטיס</h2>
          <div className={styles.grid}>
            <Card>
              <CardHeader title="צל רגיל" />
              <CardBody>--shadow-card</CardBody>
            </Card>
            <Card shadow="tight">
              <CardHeader title="צל צמוד" />
              <CardBody>--shadow-card-tight</CardBody>
            </Card>
          </div>
          <p className={styles.note}>--shadow-action על כפתור tertiary / danger.</p>
        </section>

        <section className={styles.section} id="table">
          <h2>טבלה</h2>
          <p className={styles.note}>
            שלד משותף לרשימות: כותרת + שורות. עמודות, אייקונים ותוכן — של המסך.
          </p>
          <Table>
            <TableHeader className={styles.tableHeader}>
              <div />
              <div>שם</div>
              <div>סטטוס</div>
            </TableHeader>
            {[
              { name: "תיק תמיכה", status: "In Progress", selected: false },
              { name: "ביקור באתר", status: "Confirmed", selected: true },
              { name: "התקנה", status: "To Review", selected: false },
            ].map((row) => (
              <TableRow
                key={row.name}
                selected={row.selected}
                leading={<Checkbox size="md" checked={row.selected} onChange={() => undefined} />}
              >
                <TableRowBody accent={statusAccent(row.status)}>
                  <div className={styles.tableRow}>
                    <span className={styles.tableName}>{row.name}</span>
                    <StatusChip color={statusColor(row.status)}>
                      {liveChips.find((chip) => chip.status === row.status)?.label ?? row.status}
                    </StatusChip>
                  </div>
                </TableRowBody>
              </TableRow>
            ))}
          </Table>
        </section>

        <section className={styles.section} id="overlay">
          <h2>שכבת-על / מגירה</h2>
          <p className={styles.note}>נפתחות בלחיצה — מודאל ממורכז, מגירה מקצה המסך.</p>
          <div className={styles.row}>
            <Button variant="primary" shape="action" icon={Search} onClick={() => setModalOpen(true)}>
              פתח מודאל
            </Button>
            <Button variant="tertiary" onClick={() => setDrawerOpen(true)}>
              פתח מגירה
            </Button>
          </div>
        </section>
      </div>

      <Overlay open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal
          title="מודאל"
          subtitle="Overlay + Modal"
          onClose={() => setModalOpen(false)}
          footer={
            <Button variant="primary" shape="action" onClick={() => setModalOpen(false)}>
              סגור
            </Button>
          }
        >
          חלון ממורכז מעל שכבת ההחשכה.
        </Modal>
      </Overlay>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="מגירה"
        subtitle="Drawer לסינון ולפאנל"
        footer={
          <Button variant="primary" shape="action" onClick={() => setDrawerOpen(false)}>
            החל
          </Button>
        }
      >
        נפתחת מקצה המסך. בשיבוץ ובפעילויות זה פילטר הסינון.
      </Drawer>
    </AppShell>
  );
}
