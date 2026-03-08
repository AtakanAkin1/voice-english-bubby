import  {adminFirestore}  from "@/lib/firabase/adminFirebase";
export const checkDailyLimit = async (uid: string)  => {
    const userRef = adminFirestore.collection('users').doc(uid);
    const userDoc = await userRef.get();
    if(!userDoc.exists){
        throw new Error("User Not Found");
    }

    const userData = userDoc.data();

    const today = new Date();
    today.setHours(0,0,0,0);

    const lastRequestDate = userData?.lastRequestDate.toDate();
    let dailyRequestCount = userData?.dailyRequestCount || 0;

    if(!lastRequestDate || (lastRequestDate < today)){
        await userRef.update({
            dailyRequestCount: 0,
            lastRequestDate: new Date()
        });

        dailyRequestCount = 0;
    }

    if(dailyRequestCount >=50){
        return{
            allowed: false,
            remaining:0
        }
    }

    await userRef.update({
        dailyRequestCount: dailyRequestCount + 1
    });

    return {
        allowed: true,
        remaining: 50 - (dailyRequestCount + 1)
    };
}

export const getDailyLimit = async (uid: string) => {
    const userRef = adminFirestore.collection('users').doc(uid);
    const userDoc = await userRef.get();
    if(!userDoc.exists){
        throw new Error("User Not Found");
    }

    const userData = userDoc.data();
    const maxLimit = 50;
    const used = userData?.dailyRequestCount || 0;

    return {
        max: maxLimit,
        used,
        remaining: maxLimit - used
    };
}