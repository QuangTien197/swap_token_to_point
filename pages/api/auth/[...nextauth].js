
import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import axios from "axios";
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: "918311963643-1nfag55vu3qrhubu00lc99bpdvrfhr9c.apps.googleusercontent.com",
            clientSecret: "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",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        // AppleProvider({
        //     clientId: process.env.APPLE_ID,
        //     clientSecret: process.env.APPLE_SECRET
        // }),
        // ...add more providers here
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, account }) {
            // console.log('account', account)
            if (account) {
                token.accessToken = account.access_token;
                token.googleId = account.providerAccountId;
                token.id_token = account.id_token;
            }
            return token
        },

        async signIn({ profile }) {
            try {
                const responseData = await axios.post('https://api.kimochi.fun/api/v1/users/login', profile);
                if (responseData.data.statusCode === 200) {
                    return true;
                }
                return false;
            } catch (err) {
                console.log('Error during signIn:', err.message);
                return false;
            }
        },
        async session({ session, token }) {
            // console.log('session', responsesData)
            session.accessToken = token.accessToken;
            session.googleId = token.googleId;
            session.id_token = token.id_token;

            const responseData = await axios.get(`https://api.kimochi.fun/api/v1/users/${session.googleId}`);

            session.point = responseData.data.points;
            session.diamond = responseData.data.diamond;
            // console.log('session', session);
            return session
        },

    }

}
export default NextAuth(authOptions)