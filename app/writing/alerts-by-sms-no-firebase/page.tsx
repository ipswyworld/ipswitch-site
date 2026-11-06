import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";

export const metadata: Metadata = {
  title: "Alerts without Firebase: SMS with a budget",
  description:
    "How RentPin reaches a closed app with capped text messages instead of push notifications: what is sent, who gets it, and the limits that keep the cost down.",
};

export default function Page() {
  return (
    <ArticleShell
      title="Alerts without Firebase: SMS with a budget"
      dek="How RentPin reaches a closed app with capped text messages instead of push notifications."
      foot={
        <>
          Written from the operations notes of <Link href="/work/rentpin/">RentPin</Link>, which is pre-launch. The
          limits below are design settings, not measured delivery rates.
        </>
      }
    >
      <p>
        A RentPin caretaker needs to know the moment a renter asks to view a home, even when the caretaker&rsquo;s app
        is closed. The usual answer is push notifications through Firebase. RentPin does not use Firebase, so there is
        no push notification to a closed app. Three smaller mechanisms do the job instead.
      </p>

      <h2>What replaced push</h2>
      <p>
        <strong>Reminders are scheduled on the phone.</strong> A reminder a day and an hour before a viewing is set on
        the renter&rsquo;s own device. It needs only the notification permission, and no server has to remember to send
        it.
      </p>
      <p>
        <strong>While the app is open, it asks.</strong> The phone checks for replies every 30 seconds and shows a small
        notice. The unread count sits on the message icon.
      </p>
      <p>
        <strong>When the app is closed, a text message.</strong> The important alerts go out by SMS through a provider
        wired in <code>app/sms.py</code>.
      </p>

      <h2>Who gets texted, and about what</h2>
      <p>
        A caretaker is texted for a new viewing request, a viewing moved that needs a new yes, a guest arriving at the
        gate, a renter writing to them, and their building going live. A renter is texted when their viewing is
        confirmed (with the fee) and, only if they chose &ldquo;Text me when they reply&rdquo;, when a caretaker
        replies. A caretaker&rsquo;s alert switches apply to texts too. &ldquo;Building is live&rdquo; is always sent.
      </p>

      <h2>A text costs money, so it has a budget</h2>
      <p>The cost limits are written into the code, not left to good intentions:</p>
      <ul className="how">
        <li>Each kind of alert has a cooldown. For messages, that is one text per conversation per hour for caretakers and per 30 minutes for renters.</li>
        <li>No number receives more than 12 alert texts in a day. The cap is a constant, <code>DAILY_CAP</code>, in <code>app/sms_alerts.py</code>.</li>
        <li>When WhatsApp is configured it already announces new requests, so the new-request text is skipped to avoid paying twice.</li>
      </ul>

      <h2>What it deliberately does not do</h2>
      <p>
        A renter&rsquo;s optional number for reply texts is stored only for that purpose. It is never shown to the
        caretaker, to admins, or in any API response. Texts are in English for now. If sending fails, the failure is
        logged and the booking or message still goes through: an alert is never allowed to block the thing it is
        announcing.
      </p>

      <h2>What stays switched off</h2>
      <p>
        The code for Expo push notifications is still in the repository, but it does nothing without credentials.
        Supplying an access token and a project id would switch it on later, so choosing SMS now did not close the
        door on push.
      </p>

      <h2>The point</h2>
      <p>
        A channel that costs money per message needs its limits in code, where they are tested and visible, not in a
        spreadsheet someone checks at the end of the month.
      </p>
    </ArticleShell>
  );
}
