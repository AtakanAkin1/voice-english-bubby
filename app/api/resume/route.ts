import {NextResponse} from "next/server";
import {adminFirestore, adminAuth} from "@/lib/firabase/adminFirebase";

export async function POST(req: Request){
    try {

        const authHeader = req.headers.get("authorization");

        if(!authHeader){
            return NextResponse.json({error:"Unauthorized"},{status:401});
        }

        const token = authHeader.replace("Bearer ","");

        const decoded = await adminAuth.verifyIdToken(token);

        const uid = decoded.uid;

        const {conversationId} = await req.json();

        if(!conversationId){
            return NextResponse.json(
                {error:"Conversation ID mismatch"},
                {status:400}
            );
        }

        const conversationDoc = await adminFirestore
            .collection("conversations")
            .doc(conversationId)
            .get();

        if(!conversationDoc.exists){
            return NextResponse.json({messages:[]});
        }

        const conversationData = conversationDoc.data();

        if(conversationData?.userId !== uid){
            return NextResponse.json({error:"Forbidden"},{status:403});
        }

        const messageRef = adminFirestore
            .collection("conversations")
            .doc(conversationId)
            .collection("messages");

        const snapshot = await messageRef
            .orderBy("createdAt","asc")
            .get();

        const messages = snapshot.docs.map((doc)=>{
            const data = doc.data();
            return {
                role:data.role,
                content:data.content
            };
        });

        return NextResponse.json({messages});

    }catch(err){

        console.error("Resume failed:",err);

        return NextResponse.json(
            {error:"Resume failed"},
            {status:500}
        );
    }
}