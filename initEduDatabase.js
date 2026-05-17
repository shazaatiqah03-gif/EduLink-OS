const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function initializeEduLinkDatabase() {
  console.log("🚀 Initializing EduLink OS Core Academic Infrastructure...");

  // ==========================================================
  // 1. DEFINE CORE SEED DATA FOR ACADEMIC ACTORS
  // ==========================================================
  const masterActors = [
    {
      id: "stu_se_10293",
      actor_type: "student",
      name: "Shafiq Aiman",
      metadata: {
        faculty: "Faculty of Computing",
        course: "Bachelor of Software Engineering",
        current_semester: 7,
        cgpa: 3.85,
        prerequisites_passed: true
      }
    },
    {
      id: "adv_computing_02",
      actor_type: "academic_advisor",
      name: "Dr. Siti Nurhaliza",
      metadata: {
        department: "Software Engineering Department",
        expertise: "Cloud Architecture & Databases",
        max_supervision_slots: 5,
        current_active_slots: 2
      }
    },
    {
      id: "corp_tech_xyz",
      actor_type: "industry_host",
      name: "Amanah Tech Ltd",
      metadata: {
        industry_vertical: "Enterprise Solutions",
        location: "Kuala Lumpur",
        assigned_supervisor: "Engr. Khairul",
        clearance_check_required: true
      }
    }
  ];

  // ==========================================================
  // 2. DEFINE THE PRIMORDIAL "FIRST-CLASS" ACADEMIC LINKAGE
  // ==========================================================
  const baselineLinkages = [
    {
      id: "lnk_edu_2026_fy99",
      linkage_id: "lnk_edu_2026_fy99",
      
      // Explicit Multi-Party Relational Bindings (Student - Advisor - Industry)
      actor_student_id: "stu_se_10293",
      actor_advisor_id: "adv_computing_02",
      actor_industry_id: "corp_tech_xyz",
      
      // Current Academic Operational State Flags
      status: "active", 
      linkage_state: "internship_logbook_review_underway",
      
      // Deep Historical Log Arrays (Solving Lost Academic Progress History)
      historical_interactions: [
        {
          date: "2026-05-10T09:00:00Z",
          type: "supervision_meeting",
          duration_mins: 30,
          sentiment: "highly_positive",
          notes: "Initial final year project & placement alignment complete. Architecture design approved."
        },
        {
          date: "2026-05-14T14:30:00Z",
          type: "milestone_submitted",
          doc_type: "Logbook_Week_12_Draft",
          notes: "Week 12 deployment logbook progress shared with Industry Supervisor and Academic Advisor."
        }
      ],
      
      // Real-time Academic State Machine Instruction Arrays
      platform_logic_applied: [
        "auto_verify_prerequisites", 
        "milestone_tracking", 
        "escalate_to_hod_if_logbook_stalls_7d"
      ]
    }
  ];

  try {
    // ==========================================================
    // 3. EXECUTE FIRESTORE PROVISIONING PIPELINE
    // ==========================================================
    
    console.log("\n📦 Provisioning 'academic_actors' Directory Collection...");
    for (const actor of masterActors) {
      await db.collection('academic_actors').doc(actor.id).set({
        actor_type: actor.actor_type,
        name: actor.name,
        metadata: actor.metadata,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
        updated_at: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`Successfully provisioned Academic Profile: [${actor.id}] -> ${actor.name}`);
    }

    console.log("\n🔗 Provisioning 'academic_linkages' Engine Collection...");
    for (const linkage of baselineLinkages) {
      await db.collection('academic_linkages').doc(linkage.id).set({
        linkage_id: linkage.linkage_id,
        actor_student_id: linkage.actor_student_id,
        actor_advisor_id: linkage.actor_advisor_id,
        actor_industry_id: linkage.actor_industry_id,
        status: linkage.status,
        linkage_state: linkage.linkage_state,
        historical_interactions: linkage.historical_interactions,
        platform_logic_applied: linkage.platform_logic_applied,
        created_at: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`Successfully bound Programmable Academic Linkage Document: [${linkage.id}]`);
    }

    console.log("\n✅ Step 1 Structural Education Database Initialization Complete.");
    console.log("Ready to power your EduLink OS real-time student dashboard panels!");

  } catch (error) {
    console.error("❌ Critical database topology initialization failure:", error);
    process.exit(1);
  }
}

// Fire the execution thread
initializeEduLinkDatabase();