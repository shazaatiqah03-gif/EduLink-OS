const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Admin SDK if not already running
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function seedAcademicHistory() {
  console.log("⚙️ Executing Mock Data Pipeline: Seeding Historical Academic Interactions & Bottlenecks...");

  // A batch collection of historical linkages representing past cohort interactions (2024-2025)
  const historicalLinkages = [
    {
      id: "lnk_historical_001",
      linkage_id: "lnk_historical_001",
      actor_student_id: "stu_legacy_91",
      actor_advisor_id: "adv_computing_02", // Dr. Siti Nurhaliza
      actor_industry_id: "corp_retail_abc",
      status: "resolved",
      linkage_state: "internship_completed",
      platform_logic_applied: ["standard_milestone_tracking"],
      historical_interactions: [
        {
          date: "2025-02-10T10:00:00Z",
          type: "supervision_meeting",
          duration_mins: 60,
          sentiment: "positive",
          notes: "Explored initial project parameters. Mentorship running smoothly."
        },
        {
          date: "2025-03-15T11:00:00Z",
          type: "logbook_approved",
          notes: "Final assessment signed off and executed successfully within standard 5-day window."
        }
      ],
      created_at: new Date("2025-02-01T00:00:00Z")
    },
    {
      id: "lnk_historical_002",
      linkage_id: "lnk_historical_002",
      actor_student_id: "stu_legacy_92", // Past Software Engineering Student
      actor_advisor_id: "adv_telecom_04",
      actor_industry_id: "corp_tech_xyz", // Amanah Tech Ltd
      status: "stalled",
      linkage_state: "logbook_review_deadlock",
      platform_logic_applied: ["manual_intervention_required"],
      historical_interactions: [
        {
          date: "2025-06-01T14:00:00Z",
          type: "supervision_meeting",
          duration_mins: 30,
          sentiment: "neutral",
          notes: "Industrial project parameters finalized by student and university advisor."
        },
        {
          date: "2025-06-05T09:00:00Z",
          type: "milestone_submitted",
          doc_type: "Software_Engineering_Placement_Agreement",
          notes: "Sent placement training scope to Amanah Tech Ltd HR pipeline."
        },
        {
          date: "2025-06-27T17:00:00Z",
          type: "logistics_bottleneck",
          notes: "CRITICAL VULNERABILITY ALERT: Review turnaround at Industry Host Amanah Tech Ltd exceeded 14 days in Software Engineering vertical. Progression has stalled completely."
        }
      ],
      created_at: new Date("2025-05-20T00:00:00Z")
    }
  ];

  try {
    const batch = db.batch();

    console.log("\n📦 Staging historical academic linkage entries into write batch...");
    historicalLinkages.forEach((linkage) => {
      // Directs data cleanly to your new 'academic_linkages' collection
      const docRef = db.collection('academic_linkages').doc(linkage.id);
      batch.set(docRef, {
        ...linkage,
        created_at: admin.firestore.Timestamp.fromDate(linkage.created_at)
      });
      console.log(` -> Staged: [${linkage.id}] (State: ${linkage.linkage_state})`);
    });

    console.log("\n💾 Committing batch pipeline transaction to Firestore...");
    await batch.commit();
    
    console.log("\n✅ Step 2 Mock Data Pipeline Successfully Seeded!");
    console.log("Historical academic context and industry vulnerabilities are live in your data grid.");

  } catch (error) {
    console.error("❌ Failed to push historical data pipeline:", error);
    process.exit(1);
  }
}

seedAcademicHistory();