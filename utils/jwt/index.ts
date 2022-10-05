export {};
// import jwt from 'jsonwebtoken';

// export const signToken = (_id: string, email: string) => {
//   if (!process.env.JWT_SECRET_SEED) {
//     throw new Error('No JWT seed');
//   }

//   return jwt.sign(
//     // Payload
//     {
//       _id,
//       email,
//     },
//     // Seed
//     process.env.JWT_SECRET_SEED,
//     // Options
//     {
//       expiresIn: '30d',
//     },
//   );
// };

// export const isValidToken = (token:string): Promise<string> => {
//   if (!process.env.JWT_SECRET_SEED) {
//     throw new Error('No JWT seed');
//   }

//   if (token.length <= 10) {
//     return Promise.reject(new Error('JWT not valid'));
//   }

//   return new Promise((resolve, reject) => {
//     try {
//       // eslint-disable-next-line consistent-return
//       jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
//         if (err) return reject(new Error('JWT not valid'));

//         const { _id } = payload as { _id: string };
//         resolve(_id);
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// export default signToken;
