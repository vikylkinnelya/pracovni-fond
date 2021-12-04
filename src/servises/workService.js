import { auth, googleProvider, db } from '../components/firebase';

export default class WorkService {

    defWorkHours(start, end) {
        const prestavka = 1800
        const ms = new Date(end) - new Date(start)
        const sec = (ms / 1000) - prestavka
        const hours = sec / 3600
        return +hours.toFixed(2)
    }

    async addWorkDay(workDate, workEnd, workDuration, user) {

        const dateYear = workDate.getFullYear()
        const dateMonth = workDate.getMonth()
        const dateDay = workDate.getDate()

        await db.collection('users')
            .doc(user)
            .collection(`workList/${dateYear}/${dateMonth}/`)
            .doc(`${dateDay}`)
            .set({
                workDate: workDate,
                workEnd: workEnd,
                workDuration: workDuration,
                id: (+new Date(workDate)) + Math.floor(Math.random() * 10)
            }, { merge: true })

        await this.changeHours(workDate, workDuration, '+', user)
        await this.addChartData(workDate, workDuration, user)
        return await this.getTotalHours(dateYear, dateMonth, user)
    }

    async addChartData(workDate, workDuration, user) {
        await db.collection('users')
            .doc(user)
            .collection(`chartData/`)
            .doc(`${+workDate}`)
            .set({ workDate, workDuration }
                , { merge: true })
    }

    async deleteWorkDay(workDate, workDuration, user) {

        const dateYear = workDate.getFullYear()
        const dateMonth = workDate.getMonth()
        const dateDay = workDate.getDate()

        await db.collection('users')
            .doc(user)
            .collection(`workList/${dateYear}/${dateMonth}/`)
            .doc(`${dateDay}`)
            .delete()

        await this.changeHours(workDate, workDuration, '-', user)
        await this.deleteChartData(workDate, user)
        return await this.getTotalHours(dateYear, dateMonth, user)
    }

    async deleteChartData(workDate, user) {
        await db.collection('users')
            .doc(user)
            .collection(`chartData/`)
            .doc(`${(+new Date(workDate)) + Math.floor(Math.random() * 10)}`)
            .delete()
    }

    async changeHours(date, hours, operator, user) {

        const dateYear = date.getFullYear()
        const dateMonth = date.getMonth()

        let totalHours = await this.getTotalHours(dateYear, dateMonth, user)

        const defHours = operator === '+' ? totalHours + hours : totalHours - hours

        const hoursObj = { [dateMonth]: defHours }

        await db.collection('users')
            .doc(user)
            .collection(`workHours`)
            .doc(`${dateYear}`)
            .set(hoursObj
                , { merge: true })
    }

    async getTotalHours(dateYear, dateMonth, user) {

        const hours = await db.collection('users')
            .doc(user)
            .collection(`workHours`)
            .doc(`${dateYear}`)
            .get()
        return hours.data()[dateMonth] || 0
    }

    async getWorkDaysList(year, month, user) {
        return await db.collection('users')
            .doc(user)
            .collection(`workList/${year}/${month}/`)
            .get()
    }

    async getChartData(user) {
        return await db.collection('users')
            .doc(user)
            .collection(`chartData/`)
            .get()
    }

    async getUser() {
        const user = auth.currentUser.uid
        return user
    }

    async signInWithGoogle() {
        try {
            const res = await auth.signInWithPopup(googleProvider)
            const user = res.user
            const query = await db
                .collection("users")
                .doc(`${user.uid}`)
                .get()
            if (!query) {
                await db.collection('users').doc(`${user.uid}`).set({
                    info: {
                        uid: user.uid,
                        name: user.displayName,
                        authProvider: 'google',
                        email: user.email
                    }
                })
            }
        }
        catch (err) {
            alert(err.message, 'signing with google')
        }
    }

    async signInWithEmailAndPassword(email, password) {
        try {
            await auth.signInWithEmailAndPassword(email, password)
        } catch (err) {
            alert(err.message)
        }
    }

    async registerWithEmailAndPassword(name, email, password) {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, password)
            const user = res.user
            await db.collection('users').doc(`${user.uid}`).set({
                info: {
                    uid: user.uid,
                    name,
                    authProvider: 'local',
                    email
                }
            })
        } catch (err) {
            alert(err.message)
        }
    }

    async sendPasswordResetEmail(email) {
        try {
            await auth.sendPasswordResetEmail(email)
            alert('Password link sent')
        } catch (err) {
            alert(err.message)
        }
    }

    async logOut() {
        await auth.signOut()
    }

}