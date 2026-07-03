/**
 * BLS12-381 key generation and signing.
 *
 * This mirrors plugin/typescript/tutorial/src/rpc_test.ts `signBLS()` exactly:
 *   - "long signatures" variant (G1 public keys, G2 signatures), matching the Go node's
 *     kyber bdn.Scheme
 *   - DST: BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_ (built into @noble/curves' longSignatures)
 *   - Same library (@noble/curves/bls12-381) the tutorial itself uses for test signing,
 *     so signatures produced here are verified by the same code path Canopy already exercises.
 *
 * CORRECTION (found via `tsc` against the actually-installed package, not docs): the previous
 * version of this file assumed `longSignatures.getPublicKey(privateKey)` returns raw bytes
 * directly, based on README usage examples. `tsc` proved that wrong - the installed types show
 * it returns a `WeierstrassPoint<bigint>` (a curve point object), matching how `sign()` already
 * behaved. Every noble-curves point class exposes `.toRawBytes(isCompressed?)` as an instance
 * method for serialization (the same family of method `longSignatures.Signature.toBytes()`
 * wraps for signature points) - so the public key needs that same explicit step:
 *   - `longSignatures.getPublicKey(privateKey)` -> Point -> `.toRawBytes()` -> Uint8Array
 *   - `longSignatures.hash()` / `.sign()` -> Point -> `longSignatures.Signature.toBytes()` -> Uint8Array
 *   - `bls12_381.utils.randomPrivateKey()` is unaffected - still the private-key generator.
 */

import { bls12_381 } from '@noble/curves/bls12-381';
import { addressFromPublicKey } from './address';

export interface KeyPair {
    privateKey: Uint8Array; // 32 bytes
    publicKey: Uint8Array; // G1 public key bytes (long-signature scheme)
    address: Uint8Array; // 20 bytes, sha256(publicKey)[:20]
}

/** Generate a brand-new BLS12-381 keypair using a CSPRNG. */
export function generateKeyPair(): KeyPair {
    const privateKey = bls12_381.utils.randomPrivateKey();
    return keyPairFromPrivateKey(privateKey);
}

/** Reconstruct a keypair (and address) from an existing private key, e.g. on import. */
export function keyPairFromPrivateKey(privateKey: Uint8Array): KeyPair {
    if (privateKey.length !== 32) {
        throw new Error('invalid private key: expected 32 bytes');
    }
    // getPublicKey() returns a curve Point - serialize it to bytes with .toRawBytes(), same
    // pattern as the signature Point below (via longSignatures.Signature.toBytes()).
    const publicKeyPoint = bls12_381.longSignatures.getPublicKey(privateKey);
    const publicKey = publicKeyPoint.toRawBytes();
    const address = addressFromPublicKey(publicKey);
    return { privateKey, publicKey, address };
}

/**
 * Sign arbitrary bytes (the deterministic protobuf-encoded Transaction, signature field
 * omitted - see tx.ts) with the long-signature (G2) BLS scheme.
 */
export function signBLS(privateKey: Uint8Array, message: Uint8Array): Uint8Array {
    const hashedPoint = bls12_381.longSignatures.hash(message);
    const signaturePoint = bls12_381.longSignatures.sign(hashedPoint, privateKey);
    return bls12_381.longSignatures.Signature.toBytes(signaturePoint);
}
