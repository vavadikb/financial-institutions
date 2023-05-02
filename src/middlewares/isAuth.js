import CryptoJS from "crypto-js";
export class AuthMiddleware {
  authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      return res.sendStatus(401);
    }

    const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");
    const header = JSON.parse(
      CryptoJS.enc.Base64.parse(encodedHeader).toString(CryptoJS.enc.Utf8)
    );
    const payload = JSON.parse(
      CryptoJS.enc.Base64.parse(encodedPayload).toString(CryptoJS.enc.Utf8)
    );
    const secret = process.env.SECRET;
    const signature = CryptoJS.enc.Base64.parse(encodedSignature);
    console.log(header, payload, signature);
    try {
      const isVerified = CryptoJS.HmacSHA256(
        encodedHeader + "." + encodedPayload,
        secret
      ).toString();

      if (
        isVerified !== CryptoJS.enc.Hex.parse(signature.toString()).toString()
      ) {
        return res.sendStatus(403);
      }

      req.user = payload;
      next();
    } catch (err) {
      console.error("auth error", err);
      return res.sendStatus(500);
    }
  };
}
