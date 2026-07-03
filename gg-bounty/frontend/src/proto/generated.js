/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const types = $root.types = (() => {

    /**
     * Namespace types.
     * @exports types
     * @namespace
     */
    const types = {};

    types.Account = (function() {

        /**
         * Properties of an Account.
         * @memberof types
         * @interface IAccount
         * @property {Uint8Array|null} [address] Account address
         * @property {number|Long|null} [amount] Account amount
         */

        /**
         * Constructs a new Account.
         * @memberof types
         * @classdesc Represents an Account.
         * @implements IAccount
         * @constructor
         * @param {types.IAccount=} [properties] Properties to set
         */
        function Account(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Account address.
         * @member {Uint8Array} address
         * @memberof types.Account
         * @instance
         */
        Account.prototype.address = $util.newBuffer([]);

        /**
         * Account amount.
         * @member {number|Long} amount
         * @memberof types.Account
         * @instance
         */
        Account.prototype.amount = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Account instance using the specified properties.
         * @function create
         * @memberof types.Account
         * @static
         * @param {types.IAccount=} [properties] Properties to set
         * @returns {types.Account} Account instance
         */
        Account.create = function create(properties) {
            return new Account(properties);
        };

        /**
         * Encodes the specified Account message. Does not implicitly {@link types.Account.verify|verify} messages.
         * @function encode
         * @memberof types.Account
         * @static
         * @param {types.IAccount} message Account message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Account.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.address);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.amount);
            return writer;
        };

        /**
         * Encodes the specified Account message, length delimited. Does not implicitly {@link types.Account.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Account
         * @static
         * @param {types.IAccount} message Account message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Account.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an Account message from the specified reader or buffer.
         * @function decode
         * @memberof types.Account
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Account} Account
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Account.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Account();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.address = reader.bytes();
                        break;
                    }
                case 2: {
                        message.amount = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Account message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Account
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Account} Account
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Account.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Account message.
         * @function verify
         * @memberof types.Account
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Account.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                if (!(message.address && typeof message.address.length === "number" || $util.isString(message.address)))
                    return "address: buffer expected";
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                if (!$util.isInteger(message.amount) && !(message.amount && $util.isInteger(message.amount.low) && $util.isInteger(message.amount.high)))
                    return "amount: integer|Long expected";
            return null;
        };

        /**
         * Creates an Account message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Account
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Account} Account
         */
        Account.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.Account)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.Account: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.Account();
            if (object.address != null)
                if (typeof object.address === "string")
                    $util.base64.decode(object.address, message.address = $util.newBuffer($util.base64.length(object.address)), 0);
                else if (object.address.length >= 0)
                    message.address = object.address;
            if (object.amount != null)
                if ($util.Long)
                    message.amount = $util.Long.fromValue(object.amount, true);
                else if (typeof object.amount === "string")
                    message.amount = parseInt(object.amount, 10);
                else if (typeof object.amount === "number")
                    message.amount = object.amount;
                else if (typeof object.amount === "object")
                    message.amount = new $util.LongBits(object.amount.low >>> 0, object.amount.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from an Account message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Account
         * @static
         * @param {types.Account} message Account
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Account.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.address = "";
                else {
                    object.address = [];
                    if (options.bytes !== Array)
                        object.address = $util.newBuffer(object.address);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.amount = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                object.address = options.bytes === String ? $util.base64.encode(message.address, 0, message.address.length) : options.bytes === Array ? Array.prototype.slice.call(message.address) : message.address;
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.amount = typeof message.amount === "number" ? BigInt(message.amount) : $util.Long.fromBits(message.amount.low >>> 0, message.amount.high >>> 0, true).toBigInt();
                else if (typeof message.amount === "number")
                    object.amount = options.longs === String ? String(message.amount) : message.amount;
                else
                    object.amount = options.longs === String ? $util.Long.prototype.toString.call(message.amount) : options.longs === Number ? new $util.LongBits(message.amount.low >>> 0, message.amount.high >>> 0).toNumber(true) : message.amount;
            return object;
        };

        /**
         * Converts this Account to JSON.
         * @function toJSON
         * @memberof types.Account
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Account.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Account
         * @function getTypeUrl
         * @memberof types.Account
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Account.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Account";
        };

        return Account;
    })();

    types.Pool = (function() {

        /**
         * Properties of a Pool.
         * @memberof types
         * @interface IPool
         * @property {number|Long|null} [id] Pool id
         * @property {number|Long|null} [amount] Pool amount
         */

        /**
         * Constructs a new Pool.
         * @memberof types
         * @classdesc Represents a Pool.
         * @implements IPool
         * @constructor
         * @param {types.IPool=} [properties] Properties to set
         */
        function Pool(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Pool id.
         * @member {number|Long} id
         * @memberof types.Pool
         * @instance
         */
        Pool.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Pool amount.
         * @member {number|Long} amount
         * @memberof types.Pool
         * @instance
         */
        Pool.prototype.amount = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Pool instance using the specified properties.
         * @function create
         * @memberof types.Pool
         * @static
         * @param {types.IPool=} [properties] Properties to set
         * @returns {types.Pool} Pool instance
         */
        Pool.create = function create(properties) {
            return new Pool(properties);
        };

        /**
         * Encodes the specified Pool message. Does not implicitly {@link types.Pool.verify|verify} messages.
         * @function encode
         * @memberof types.Pool
         * @static
         * @param {types.IPool} message Pool message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Pool.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.amount);
            return writer;
        };

        /**
         * Encodes the specified Pool message, length delimited. Does not implicitly {@link types.Pool.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Pool
         * @static
         * @param {types.IPool} message Pool message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Pool.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Pool message from the specified reader or buffer.
         * @function decode
         * @memberof types.Pool
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Pool} Pool
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Pool.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Pool();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.uint64();
                        break;
                    }
                case 2: {
                        message.amount = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Pool message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Pool
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Pool} Pool
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Pool.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Pool message.
         * @function verify
         * @memberof types.Pool
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Pool.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                if (!$util.isInteger(message.amount) && !(message.amount && $util.isInteger(message.amount.low) && $util.isInteger(message.amount.high)))
                    return "amount: integer|Long expected";
            return null;
        };

        /**
         * Creates a Pool message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Pool
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Pool} Pool
         */
        Pool.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.Pool)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.Pool: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.Pool();
            if (object.id != null)
                if ($util.Long)
                    message.id = $util.Long.fromValue(object.id, true);
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
            if (object.amount != null)
                if ($util.Long)
                    message.amount = $util.Long.fromValue(object.amount, true);
                else if (typeof object.amount === "string")
                    message.amount = parseInt(object.amount, 10);
                else if (typeof object.amount === "number")
                    message.amount = object.amount;
                else if (typeof object.amount === "object")
                    message.amount = new $util.LongBits(object.amount.low >>> 0, object.amount.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Pool message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Pool
         * @static
         * @param {types.Pool} message Pool
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Pool.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.id = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.amount = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.id = typeof message.id === "number" ? BigInt(message.id) : $util.Long.fromBits(message.id.low >>> 0, message.id.high >>> 0, true).toBigInt();
                else if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.amount = typeof message.amount === "number" ? BigInt(message.amount) : $util.Long.fromBits(message.amount.low >>> 0, message.amount.high >>> 0, true).toBigInt();
                else if (typeof message.amount === "number")
                    object.amount = options.longs === String ? String(message.amount) : message.amount;
                else
                    object.amount = options.longs === String ? $util.Long.prototype.toString.call(message.amount) : options.longs === Number ? new $util.LongBits(message.amount.low >>> 0, message.amount.high >>> 0).toNumber(true) : message.amount;
            return object;
        };

        /**
         * Converts this Pool to JSON.
         * @function toJSON
         * @memberof types.Pool
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Pool.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Pool
         * @function getTypeUrl
         * @memberof types.Pool
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Pool.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Pool";
        };

        return Pool;
    })();

    types.Event = (function() {

        /**
         * Properties of an Event.
         * @memberof types
         * @interface IEvent
         * @property {string|null} [eventType] Event eventType
         * @property {types.IEventCustom|null} [custom] Event custom
         * @property {number|Long|null} [height] Event height
         * @property {string|null} [reference] Event reference
         * @property {number|Long|null} [chainId] Event chainId
         * @property {number|Long|null} [blockHeight] Event blockHeight
         * @property {Uint8Array|null} [blockHash] Event blockHash
         * @property {Uint8Array|null} [address] Event address
         */

        /**
         * Constructs a new Event.
         * @memberof types
         * @classdesc Represents an Event.
         * @implements IEvent
         * @constructor
         * @param {types.IEvent=} [properties] Properties to set
         */
        function Event(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Event eventType.
         * @member {string} eventType
         * @memberof types.Event
         * @instance
         */
        Event.prototype.eventType = "";

        /**
         * Event custom.
         * @member {types.IEventCustom|null|undefined} custom
         * @memberof types.Event
         * @instance
         */
        Event.prototype.custom = null;

        /**
         * Event height.
         * @member {number|Long} height
         * @memberof types.Event
         * @instance
         */
        Event.prototype.height = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Event reference.
         * @member {string} reference
         * @memberof types.Event
         * @instance
         */
        Event.prototype.reference = "";

        /**
         * Event chainId.
         * @member {number|Long} chainId
         * @memberof types.Event
         * @instance
         */
        Event.prototype.chainId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Event blockHeight.
         * @member {number|Long} blockHeight
         * @memberof types.Event
         * @instance
         */
        Event.prototype.blockHeight = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Event blockHash.
         * @member {Uint8Array} blockHash
         * @memberof types.Event
         * @instance
         */
        Event.prototype.blockHash = $util.newBuffer([]);

        /**
         * Event address.
         * @member {Uint8Array} address
         * @memberof types.Event
         * @instance
         */
        Event.prototype.address = $util.newBuffer([]);

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Event msg.
         * @member {"custom"|undefined} msg
         * @memberof types.Event
         * @instance
         */
        Object.defineProperty(Event.prototype, "msg", {
            get: $util.oneOfGetter($oneOfFields = ["custom"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Event instance using the specified properties.
         * @function create
         * @memberof types.Event
         * @static
         * @param {types.IEvent=} [properties] Properties to set
         * @returns {types.Event} Event instance
         */
        Event.create = function create(properties) {
            return new Event(properties);
        };

        /**
         * Encodes the specified Event message. Does not implicitly {@link types.Event.verify|verify} messages.
         * @function encode
         * @memberof types.Event
         * @static
         * @param {types.IEvent} message Event message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Event.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.eventType != null && Object.hasOwnProperty.call(message, "eventType"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.eventType);
            if (message.custom != null && Object.hasOwnProperty.call(message, "custom"))
                $root.types.EventCustom.encode(message.custom, writer.uint32(/* id 11, wireType 2 =*/90).fork(), q + 1).ldelim();
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 91, wireType 0 =*/728).uint64(message.height);
            if (message.reference != null && Object.hasOwnProperty.call(message, "reference"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.reference);
            if (message.chainId != null && Object.hasOwnProperty.call(message, "chainId"))
                writer.uint32(/* id 93, wireType 0 =*/744).uint64(message.chainId);
            if (message.blockHeight != null && Object.hasOwnProperty.call(message, "blockHeight"))
                writer.uint32(/* id 94, wireType 0 =*/752).uint64(message.blockHeight);
            if (message.blockHash != null && Object.hasOwnProperty.call(message, "blockHash"))
                writer.uint32(/* id 95, wireType 2 =*/762).bytes(message.blockHash);
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                writer.uint32(/* id 96, wireType 2 =*/770).bytes(message.address);
            return writer;
        };

        /**
         * Encodes the specified Event message, length delimited. Does not implicitly {@link types.Event.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Event
         * @static
         * @param {types.IEvent} message Event message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Event.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an Event message from the specified reader or buffer.
         * @function decode
         * @memberof types.Event
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Event} Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Event.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Event();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.eventType = reader.string();
                        break;
                    }
                case 11: {
                        message.custom = $root.types.EventCustom.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 91: {
                        message.height = reader.uint64();
                        break;
                    }
                case 92: {
                        message.reference = reader.string();
                        break;
                    }
                case 93: {
                        message.chainId = reader.uint64();
                        break;
                    }
                case 94: {
                        message.blockHeight = reader.uint64();
                        break;
                    }
                case 95: {
                        message.blockHash = reader.bytes();
                        break;
                    }
                case 96: {
                        message.address = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Event message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Event
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Event} Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Event.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Event message.
         * @function verify
         * @memberof types.Event
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Event.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.eventType != null && Object.hasOwnProperty.call(message, "eventType"))
                if (!$util.isString(message.eventType))
                    return "eventType: string expected";
            if (message.custom != null && Object.hasOwnProperty.call(message, "custom")) {
                properties.msg = 1;
                {
                    let error = $root.types.EventCustom.verify(message.custom, long + 1);
                    if (error)
                        return "custom." + error;
                }
            }
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                    return "height: integer|Long expected";
            if (message.reference != null && Object.hasOwnProperty.call(message, "reference"))
                if (!$util.isString(message.reference))
                    return "reference: string expected";
            if (message.chainId != null && Object.hasOwnProperty.call(message, "chainId"))
                if (!$util.isInteger(message.chainId) && !(message.chainId && $util.isInteger(message.chainId.low) && $util.isInteger(message.chainId.high)))
                    return "chainId: integer|Long expected";
            if (message.blockHeight != null && Object.hasOwnProperty.call(message, "blockHeight"))
                if (!$util.isInteger(message.blockHeight) && !(message.blockHeight && $util.isInteger(message.blockHeight.low) && $util.isInteger(message.blockHeight.high)))
                    return "blockHeight: integer|Long expected";
            if (message.blockHash != null && Object.hasOwnProperty.call(message, "blockHash"))
                if (!(message.blockHash && typeof message.blockHash.length === "number" || $util.isString(message.blockHash)))
                    return "blockHash: buffer expected";
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                if (!(message.address && typeof message.address.length === "number" || $util.isString(message.address)))
                    return "address: buffer expected";
            return null;
        };

        /**
         * Creates an Event message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Event
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Event} Event
         */
        Event.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.Event)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.Event: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.Event();
            if (object.eventType != null)
                message.eventType = String(object.eventType);
            if (object.custom != null) {
                if (!$util.isObject(object.custom))
                    throw TypeError(".types.Event.custom: object expected");
                message.custom = $root.types.EventCustom.fromObject(object.custom, long + 1);
            }
            if (object.height != null)
                if ($util.Long)
                    message.height = $util.Long.fromValue(object.height, true);
                else if (typeof object.height === "string")
                    message.height = parseInt(object.height, 10);
                else if (typeof object.height === "number")
                    message.height = object.height;
                else if (typeof object.height === "object")
                    message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber(true);
            if (object.reference != null)
                message.reference = String(object.reference);
            if (object.chainId != null)
                if ($util.Long)
                    message.chainId = $util.Long.fromValue(object.chainId, true);
                else if (typeof object.chainId === "string")
                    message.chainId = parseInt(object.chainId, 10);
                else if (typeof object.chainId === "number")
                    message.chainId = object.chainId;
                else if (typeof object.chainId === "object")
                    message.chainId = new $util.LongBits(object.chainId.low >>> 0, object.chainId.high >>> 0).toNumber(true);
            if (object.blockHeight != null)
                if ($util.Long)
                    message.blockHeight = $util.Long.fromValue(object.blockHeight, true);
                else if (typeof object.blockHeight === "string")
                    message.blockHeight = parseInt(object.blockHeight, 10);
                else if (typeof object.blockHeight === "number")
                    message.blockHeight = object.blockHeight;
                else if (typeof object.blockHeight === "object")
                    message.blockHeight = new $util.LongBits(object.blockHeight.low >>> 0, object.blockHeight.high >>> 0).toNumber(true);
            if (object.blockHash != null)
                if (typeof object.blockHash === "string")
                    $util.base64.decode(object.blockHash, message.blockHash = $util.newBuffer($util.base64.length(object.blockHash)), 0);
                else if (object.blockHash.length >= 0)
                    message.blockHash = object.blockHash;
            if (object.address != null)
                if (typeof object.address === "string")
                    $util.base64.decode(object.address, message.address = $util.newBuffer($util.base64.length(object.address)), 0);
                else if (object.address.length >= 0)
                    message.address = object.address;
            return message;
        };

        /**
         * Creates a plain object from an Event message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Event
         * @static
         * @param {types.Event} message Event
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Event.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.eventType = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.height = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.reference = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.chainId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.chainId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.blockHeight = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.blockHeight = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.blockHash = "";
                else {
                    object.blockHash = [];
                    if (options.bytes !== Array)
                        object.blockHash = $util.newBuffer(object.blockHash);
                }
                if (options.bytes === String)
                    object.address = "";
                else {
                    object.address = [];
                    if (options.bytes !== Array)
                        object.address = $util.newBuffer(object.address);
                }
            }
            if (message.eventType != null && Object.hasOwnProperty.call(message, "eventType"))
                object.eventType = message.eventType;
            if (message.custom != null && Object.hasOwnProperty.call(message, "custom")) {
                object.custom = $root.types.EventCustom.toObject(message.custom, options, q + 1);
                if (options.oneofs)
                    object.msg = "custom";
            }
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.height = typeof message.height === "number" ? BigInt(message.height) : $util.Long.fromBits(message.height.low >>> 0, message.height.high >>> 0, true).toBigInt();
                else if (typeof message.height === "number")
                    object.height = options.longs === String ? String(message.height) : message.height;
                else
                    object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber(true) : message.height;
            if (message.reference != null && Object.hasOwnProperty.call(message, "reference"))
                object.reference = message.reference;
            if (message.chainId != null && Object.hasOwnProperty.call(message, "chainId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.chainId = typeof message.chainId === "number" ? BigInt(message.chainId) : $util.Long.fromBits(message.chainId.low >>> 0, message.chainId.high >>> 0, true).toBigInt();
                else if (typeof message.chainId === "number")
                    object.chainId = options.longs === String ? String(message.chainId) : message.chainId;
                else
                    object.chainId = options.longs === String ? $util.Long.prototype.toString.call(message.chainId) : options.longs === Number ? new $util.LongBits(message.chainId.low >>> 0, message.chainId.high >>> 0).toNumber(true) : message.chainId;
            if (message.blockHeight != null && Object.hasOwnProperty.call(message, "blockHeight"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.blockHeight = typeof message.blockHeight === "number" ? BigInt(message.blockHeight) : $util.Long.fromBits(message.blockHeight.low >>> 0, message.blockHeight.high >>> 0, true).toBigInt();
                else if (typeof message.blockHeight === "number")
                    object.blockHeight = options.longs === String ? String(message.blockHeight) : message.blockHeight;
                else
                    object.blockHeight = options.longs === String ? $util.Long.prototype.toString.call(message.blockHeight) : options.longs === Number ? new $util.LongBits(message.blockHeight.low >>> 0, message.blockHeight.high >>> 0).toNumber(true) : message.blockHeight;
            if (message.blockHash != null && Object.hasOwnProperty.call(message, "blockHash"))
                object.blockHash = options.bytes === String ? $util.base64.encode(message.blockHash, 0, message.blockHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.blockHash) : message.blockHash;
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                object.address = options.bytes === String ? $util.base64.encode(message.address, 0, message.address.length) : options.bytes === Array ? Array.prototype.slice.call(message.address) : message.address;
            return object;
        };

        /**
         * Converts this Event to JSON.
         * @function toJSON
         * @memberof types.Event
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Event.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Event
         * @function getTypeUrl
         * @memberof types.Event
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Event.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Event";
        };

        return Event;
    })();

    types.EventCustom = (function() {

        /**
         * Properties of an EventCustom.
         * @memberof types
         * @interface IEventCustom
         * @property {google.protobuf.IAny|null} [msg] EventCustom msg
         */

        /**
         * Constructs a new EventCustom.
         * @memberof types
         * @classdesc Represents an EventCustom.
         * @implements IEventCustom
         * @constructor
         * @param {types.IEventCustom=} [properties] Properties to set
         */
        function EventCustom(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EventCustom msg.
         * @member {google.protobuf.IAny|null|undefined} msg
         * @memberof types.EventCustom
         * @instance
         */
        EventCustom.prototype.msg = null;

        /**
         * Creates a new EventCustom instance using the specified properties.
         * @function create
         * @memberof types.EventCustom
         * @static
         * @param {types.IEventCustom=} [properties] Properties to set
         * @returns {types.EventCustom} EventCustom instance
         */
        EventCustom.create = function create(properties) {
            return new EventCustom(properties);
        };

        /**
         * Encodes the specified EventCustom message. Does not implicitly {@link types.EventCustom.verify|verify} messages.
         * @function encode
         * @memberof types.EventCustom
         * @static
         * @param {types.IEventCustom} message EventCustom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EventCustom.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                $root.google.protobuf.Any.encode(message.msg, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified EventCustom message, length delimited. Does not implicitly {@link types.EventCustom.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.EventCustom
         * @static
         * @param {types.IEventCustom} message EventCustom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EventCustom.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an EventCustom message from the specified reader or buffer.
         * @function decode
         * @memberof types.EventCustom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.EventCustom} EventCustom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EventCustom.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.EventCustom();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.msg = $root.google.protobuf.Any.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EventCustom message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.EventCustom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.EventCustom} EventCustom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EventCustom.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EventCustom message.
         * @function verify
         * @memberof types.EventCustom
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EventCustom.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg")) {
                let error = $root.google.protobuf.Any.verify(message.msg, long + 1);
                if (error)
                    return "msg." + error;
            }
            return null;
        };

        /**
         * Creates an EventCustom message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.EventCustom
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.EventCustom} EventCustom
         */
        EventCustom.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.EventCustom)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.EventCustom: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.EventCustom();
            if (object.msg != null) {
                if (!$util.isObject(object.msg))
                    throw TypeError(".types.EventCustom.msg: object expected");
                message.msg = $root.google.protobuf.Any.fromObject(object.msg, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an EventCustom message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.EventCustom
         * @static
         * @param {types.EventCustom} message EventCustom
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EventCustom.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.msg = null;
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                object.msg = $root.google.protobuf.Any.toObject(message.msg, options, q + 1);
            return object;
        };

        /**
         * Converts this EventCustom to JSON.
         * @function toJSON
         * @memberof types.EventCustom
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EventCustom.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EventCustom
         * @function getTypeUrl
         * @memberof types.EventCustom
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EventCustom.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.EventCustom";
        };

        return EventCustom;
    })();

    types.FSMToPlugin = (function() {

        /**
         * Properties of a FSMToPlugin.
         * @memberof types
         * @interface IFSMToPlugin
         * @property {number|Long|null} [id] FSMToPlugin id
         * @property {types.IPluginFSMConfig|null} [config] FSMToPlugin config
         * @property {types.IPluginGenesisRequest|null} [genesis] FSMToPlugin genesis
         * @property {types.IPluginBeginRequest|null} [begin] FSMToPlugin begin
         * @property {types.IPluginCheckRequest|null} [check] FSMToPlugin check
         * @property {types.IPluginDeliverRequest|null} [deliver] FSMToPlugin deliver
         * @property {types.IPluginEndRequest|null} [end] FSMToPlugin end
         * @property {types.IPluginStateReadResponse|null} [stateRead] FSMToPlugin stateRead
         * @property {types.IPluginStateWriteResponse|null} [stateWrite] FSMToPlugin stateWrite
         * @property {types.IPluginQueryResponse|null} [query] FSMToPlugin query
         * @property {types.IPluginError|null} [error] FSMToPlugin error
         */

        /**
         * Constructs a new FSMToPlugin.
         * @memberof types
         * @classdesc Represents a FSMToPlugin.
         * @implements IFSMToPlugin
         * @constructor
         * @param {types.IFSMToPlugin=} [properties] Properties to set
         */
        function FSMToPlugin(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FSMToPlugin id.
         * @member {number|Long} id
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * FSMToPlugin config.
         * @member {types.IPluginFSMConfig|null|undefined} config
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.config = null;

        /**
         * FSMToPlugin genesis.
         * @member {types.IPluginGenesisRequest|null|undefined} genesis
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.genesis = null;

        /**
         * FSMToPlugin begin.
         * @member {types.IPluginBeginRequest|null|undefined} begin
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.begin = null;

        /**
         * FSMToPlugin check.
         * @member {types.IPluginCheckRequest|null|undefined} check
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.check = null;

        /**
         * FSMToPlugin deliver.
         * @member {types.IPluginDeliverRequest|null|undefined} deliver
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.deliver = null;

        /**
         * FSMToPlugin end.
         * @member {types.IPluginEndRequest|null|undefined} end
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.end = null;

        /**
         * FSMToPlugin stateRead.
         * @member {types.IPluginStateReadResponse|null|undefined} stateRead
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.stateRead = null;

        /**
         * FSMToPlugin stateWrite.
         * @member {types.IPluginStateWriteResponse|null|undefined} stateWrite
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.stateWrite = null;

        /**
         * FSMToPlugin query.
         * @member {types.IPluginQueryResponse|null|undefined} query
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.query = null;

        /**
         * FSMToPlugin error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.error = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * FSMToPlugin payload.
         * @member {"config"|"genesis"|"begin"|"check"|"deliver"|"end"|"stateRead"|"stateWrite"|"query"|"error"|undefined} payload
         * @memberof types.FSMToPlugin
         * @instance
         */
        Object.defineProperty(FSMToPlugin.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["config", "genesis", "begin", "check", "deliver", "end", "stateRead", "stateWrite", "query", "error"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new FSMToPlugin instance using the specified properties.
         * @function create
         * @memberof types.FSMToPlugin
         * @static
         * @param {types.IFSMToPlugin=} [properties] Properties to set
         * @returns {types.FSMToPlugin} FSMToPlugin instance
         */
        FSMToPlugin.create = function create(properties) {
            return new FSMToPlugin(properties);
        };

        /**
         * Encodes the specified FSMToPlugin message. Does not implicitly {@link types.FSMToPlugin.verify|verify} messages.
         * @function encode
         * @memberof types.FSMToPlugin
         * @static
         * @param {types.IFSMToPlugin} message FSMToPlugin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FSMToPlugin.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                $root.types.PluginFSMConfig.encode(message.config, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.genesis != null && Object.hasOwnProperty.call(message, "genesis"))
                $root.types.PluginGenesisRequest.encode(message.genesis, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.begin != null && Object.hasOwnProperty.call(message, "begin"))
                $root.types.PluginBeginRequest.encode(message.begin, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            if (message.check != null && Object.hasOwnProperty.call(message, "check"))
                $root.types.PluginCheckRequest.encode(message.check, writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            if (message.deliver != null && Object.hasOwnProperty.call(message, "deliver"))
                $root.types.PluginDeliverRequest.encode(message.deliver, writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                $root.types.PluginEndRequest.encode(message.end, writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
            if (message.stateRead != null && Object.hasOwnProperty.call(message, "stateRead"))
                $root.types.PluginStateReadResponse.encode(message.stateRead, writer.uint32(/* id 8, wireType 2 =*/66).fork(), q + 1).ldelim();
            if (message.stateWrite != null && Object.hasOwnProperty.call(message, "stateWrite"))
                $root.types.PluginStateWriteResponse.encode(message.stateWrite, writer.uint32(/* id 9, wireType 2 =*/74).fork(), q + 1).ldelim();
            if (message.query != null && Object.hasOwnProperty.call(message, "query"))
                $root.types.PluginQueryResponse.encode(message.query, writer.uint32(/* id 10, wireType 2 =*/82).fork(), q + 1).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified FSMToPlugin message, length delimited. Does not implicitly {@link types.FSMToPlugin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.FSMToPlugin
         * @static
         * @param {types.IFSMToPlugin} message FSMToPlugin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FSMToPlugin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a FSMToPlugin message from the specified reader or buffer.
         * @function decode
         * @memberof types.FSMToPlugin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.FSMToPlugin} FSMToPlugin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FSMToPlugin.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.FSMToPlugin();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.uint64();
                        break;
                    }
                case 2: {
                        message.config = $root.types.PluginFSMConfig.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.genesis = $root.types.PluginGenesisRequest.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 4: {
                        message.begin = $root.types.PluginBeginRequest.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 5: {
                        message.check = $root.types.PluginCheckRequest.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 6: {
                        message.deliver = $root.types.PluginDeliverRequest.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 7: {
                        message.end = $root.types.PluginEndRequest.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 8: {
                        message.stateRead = $root.types.PluginStateReadResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 9: {
                        message.stateWrite = $root.types.PluginStateWriteResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 10: {
                        message.query = $root.types.PluginQueryResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FSMToPlugin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.FSMToPlugin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.FSMToPlugin} FSMToPlugin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FSMToPlugin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FSMToPlugin message.
         * @function verify
         * @memberof types.FSMToPlugin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FSMToPlugin.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.config != null && Object.hasOwnProperty.call(message, "config")) {
                properties.payload = 1;
                {
                    let error = $root.types.PluginFSMConfig.verify(message.config, long + 1);
                    if (error)
                        return "config." + error;
                }
            }
            if (message.genesis != null && Object.hasOwnProperty.call(message, "genesis")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginGenesisRequest.verify(message.genesis, long + 1);
                    if (error)
                        return "genesis." + error;
                }
            }
            if (message.begin != null && Object.hasOwnProperty.call(message, "begin")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginBeginRequest.verify(message.begin, long + 1);
                    if (error)
                        return "begin." + error;
                }
            }
            if (message.check != null && Object.hasOwnProperty.call(message, "check")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginCheckRequest.verify(message.check, long + 1);
                    if (error)
                        return "check." + error;
                }
            }
            if (message.deliver != null && Object.hasOwnProperty.call(message, "deliver")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginDeliverRequest.verify(message.deliver, long + 1);
                    if (error)
                        return "deliver." + error;
                }
            }
            if (message.end != null && Object.hasOwnProperty.call(message, "end")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginEndRequest.verify(message.end, long + 1);
                    if (error)
                        return "end." + error;
                }
            }
            if (message.stateRead != null && Object.hasOwnProperty.call(message, "stateRead")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginStateReadResponse.verify(message.stateRead, long + 1);
                    if (error)
                        return "stateRead." + error;
                }
            }
            if (message.stateWrite != null && Object.hasOwnProperty.call(message, "stateWrite")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginStateWriteResponse.verify(message.stateWrite, long + 1);
                    if (error)
                        return "stateWrite." + error;
                }
            }
            if (message.query != null && Object.hasOwnProperty.call(message, "query")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginQueryResponse.verify(message.query, long + 1);
                    if (error)
                        return "query." + error;
                }
            }
            if (message.error != null && Object.hasOwnProperty.call(message, "error")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginError.verify(message.error, long + 1);
                    if (error)
                        return "error." + error;
                }
            }
            return null;
        };

        /**
         * Creates a FSMToPlugin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.FSMToPlugin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.FSMToPlugin} FSMToPlugin
         */
        FSMToPlugin.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.FSMToPlugin)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.FSMToPlugin: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.FSMToPlugin();
            if (object.id != null)
                if ($util.Long)
                    message.id = $util.Long.fromValue(object.id, true);
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
            if (object.config != null) {
                if (!$util.isObject(object.config))
                    throw TypeError(".types.FSMToPlugin.config: object expected");
                message.config = $root.types.PluginFSMConfig.fromObject(object.config, long + 1);
            }
            if (object.genesis != null) {
                if (!$util.isObject(object.genesis))
                    throw TypeError(".types.FSMToPlugin.genesis: object expected");
                message.genesis = $root.types.PluginGenesisRequest.fromObject(object.genesis, long + 1);
            }
            if (object.begin != null) {
                if (!$util.isObject(object.begin))
                    throw TypeError(".types.FSMToPlugin.begin: object expected");
                message.begin = $root.types.PluginBeginRequest.fromObject(object.begin, long + 1);
            }
            if (object.check != null) {
                if (!$util.isObject(object.check))
                    throw TypeError(".types.FSMToPlugin.check: object expected");
                message.check = $root.types.PluginCheckRequest.fromObject(object.check, long + 1);
            }
            if (object.deliver != null) {
                if (!$util.isObject(object.deliver))
                    throw TypeError(".types.FSMToPlugin.deliver: object expected");
                message.deliver = $root.types.PluginDeliverRequest.fromObject(object.deliver, long + 1);
            }
            if (object.end != null) {
                if (!$util.isObject(object.end))
                    throw TypeError(".types.FSMToPlugin.end: object expected");
                message.end = $root.types.PluginEndRequest.fromObject(object.end, long + 1);
            }
            if (object.stateRead != null) {
                if (!$util.isObject(object.stateRead))
                    throw TypeError(".types.FSMToPlugin.stateRead: object expected");
                message.stateRead = $root.types.PluginStateReadResponse.fromObject(object.stateRead, long + 1);
            }
            if (object.stateWrite != null) {
                if (!$util.isObject(object.stateWrite))
                    throw TypeError(".types.FSMToPlugin.stateWrite: object expected");
                message.stateWrite = $root.types.PluginStateWriteResponse.fromObject(object.stateWrite, long + 1);
            }
            if (object.query != null) {
                if (!$util.isObject(object.query))
                    throw TypeError(".types.FSMToPlugin.query: object expected");
                message.query = $root.types.PluginQueryResponse.fromObject(object.query, long + 1);
            }
            if (object.error != null) {
                if (!$util.isObject(object.error))
                    throw TypeError(".types.FSMToPlugin.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a FSMToPlugin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.FSMToPlugin
         * @static
         * @param {types.FSMToPlugin} message FSMToPlugin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FSMToPlugin.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.id = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.id = typeof message.id === "number" ? BigInt(message.id) : $util.Long.fromBits(message.id.low >>> 0, message.id.high >>> 0, true).toBigInt();
                else if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
            if (message.config != null && Object.hasOwnProperty.call(message, "config")) {
                object.config = $root.types.PluginFSMConfig.toObject(message.config, options, q + 1);
                if (options.oneofs)
                    object.payload = "config";
            }
            if (message.genesis != null && Object.hasOwnProperty.call(message, "genesis")) {
                object.genesis = $root.types.PluginGenesisRequest.toObject(message.genesis, options, q + 1);
                if (options.oneofs)
                    object.payload = "genesis";
            }
            if (message.begin != null && Object.hasOwnProperty.call(message, "begin")) {
                object.begin = $root.types.PluginBeginRequest.toObject(message.begin, options, q + 1);
                if (options.oneofs)
                    object.payload = "begin";
            }
            if (message.check != null && Object.hasOwnProperty.call(message, "check")) {
                object.check = $root.types.PluginCheckRequest.toObject(message.check, options, q + 1);
                if (options.oneofs)
                    object.payload = "check";
            }
            if (message.deliver != null && Object.hasOwnProperty.call(message, "deliver")) {
                object.deliver = $root.types.PluginDeliverRequest.toObject(message.deliver, options, q + 1);
                if (options.oneofs)
                    object.payload = "deliver";
            }
            if (message.end != null && Object.hasOwnProperty.call(message, "end")) {
                object.end = $root.types.PluginEndRequest.toObject(message.end, options, q + 1);
                if (options.oneofs)
                    object.payload = "end";
            }
            if (message.stateRead != null && Object.hasOwnProperty.call(message, "stateRead")) {
                object.stateRead = $root.types.PluginStateReadResponse.toObject(message.stateRead, options, q + 1);
                if (options.oneofs)
                    object.payload = "stateRead";
            }
            if (message.stateWrite != null && Object.hasOwnProperty.call(message, "stateWrite")) {
                object.stateWrite = $root.types.PluginStateWriteResponse.toObject(message.stateWrite, options, q + 1);
                if (options.oneofs)
                    object.payload = "stateWrite";
            }
            if (message.query != null && Object.hasOwnProperty.call(message, "query")) {
                object.query = $root.types.PluginQueryResponse.toObject(message.query, options, q + 1);
                if (options.oneofs)
                    object.payload = "query";
            }
            if (message.error != null && Object.hasOwnProperty.call(message, "error")) {
                object.error = $root.types.PluginError.toObject(message.error, options, q + 1);
                if (options.oneofs)
                    object.payload = "error";
            }
            return object;
        };

        /**
         * Converts this FSMToPlugin to JSON.
         * @function toJSON
         * @memberof types.FSMToPlugin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FSMToPlugin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for FSMToPlugin
         * @function getTypeUrl
         * @memberof types.FSMToPlugin
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        FSMToPlugin.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.FSMToPlugin";
        };

        return FSMToPlugin;
    })();

    types.PluginToFSM = (function() {

        /**
         * Properties of a PluginToFSM.
         * @memberof types
         * @interface IPluginToFSM
         * @property {number|Long|null} [id] PluginToFSM id
         * @property {types.IPluginConfig|null} [config] PluginToFSM config
         * @property {types.IPluginGenesisResponse|null} [genesis] PluginToFSM genesis
         * @property {types.IPluginBeginResponse|null} [begin] PluginToFSM begin
         * @property {types.IPluginCheckResponse|null} [check] PluginToFSM check
         * @property {types.IPluginDeliverResponse|null} [deliver] PluginToFSM deliver
         * @property {types.IPluginEndResponse|null} [end] PluginToFSM end
         * @property {types.IPluginStateReadRequest|null} [stateRead] PluginToFSM stateRead
         * @property {types.IPluginStateWriteRequest|null} [stateWrite] PluginToFSM stateWrite
         * @property {types.IPluginQueryRequest|null} [query] PluginToFSM query
         */

        /**
         * Constructs a new PluginToFSM.
         * @memberof types
         * @classdesc Represents a PluginToFSM.
         * @implements IPluginToFSM
         * @constructor
         * @param {types.IPluginToFSM=} [properties] Properties to set
         */
        function PluginToFSM(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginToFSM id.
         * @member {number|Long} id
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginToFSM config.
         * @member {types.IPluginConfig|null|undefined} config
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.config = null;

        /**
         * PluginToFSM genesis.
         * @member {types.IPluginGenesisResponse|null|undefined} genesis
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.genesis = null;

        /**
         * PluginToFSM begin.
         * @member {types.IPluginBeginResponse|null|undefined} begin
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.begin = null;

        /**
         * PluginToFSM check.
         * @member {types.IPluginCheckResponse|null|undefined} check
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.check = null;

        /**
         * PluginToFSM deliver.
         * @member {types.IPluginDeliverResponse|null|undefined} deliver
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.deliver = null;

        /**
         * PluginToFSM end.
         * @member {types.IPluginEndResponse|null|undefined} end
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.end = null;

        /**
         * PluginToFSM stateRead.
         * @member {types.IPluginStateReadRequest|null|undefined} stateRead
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.stateRead = null;

        /**
         * PluginToFSM stateWrite.
         * @member {types.IPluginStateWriteRequest|null|undefined} stateWrite
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.stateWrite = null;

        /**
         * PluginToFSM query.
         * @member {types.IPluginQueryRequest|null|undefined} query
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.query = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * PluginToFSM payload.
         * @member {"config"|"genesis"|"begin"|"check"|"deliver"|"end"|"stateRead"|"stateWrite"|"query"|undefined} payload
         * @memberof types.PluginToFSM
         * @instance
         */
        Object.defineProperty(PluginToFSM.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["config", "genesis", "begin", "check", "deliver", "end", "stateRead", "stateWrite", "query"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new PluginToFSM instance using the specified properties.
         * @function create
         * @memberof types.PluginToFSM
         * @static
         * @param {types.IPluginToFSM=} [properties] Properties to set
         * @returns {types.PluginToFSM} PluginToFSM instance
         */
        PluginToFSM.create = function create(properties) {
            return new PluginToFSM(properties);
        };

        /**
         * Encodes the specified PluginToFSM message. Does not implicitly {@link types.PluginToFSM.verify|verify} messages.
         * @function encode
         * @memberof types.PluginToFSM
         * @static
         * @param {types.IPluginToFSM} message PluginToFSM message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginToFSM.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                $root.types.PluginConfig.encode(message.config, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.genesis != null && Object.hasOwnProperty.call(message, "genesis"))
                $root.types.PluginGenesisResponse.encode(message.genesis, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.begin != null && Object.hasOwnProperty.call(message, "begin"))
                $root.types.PluginBeginResponse.encode(message.begin, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            if (message.check != null && Object.hasOwnProperty.call(message, "check"))
                $root.types.PluginCheckResponse.encode(message.check, writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            if (message.deliver != null && Object.hasOwnProperty.call(message, "deliver"))
                $root.types.PluginDeliverResponse.encode(message.deliver, writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                $root.types.PluginEndResponse.encode(message.end, writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
            if (message.stateRead != null && Object.hasOwnProperty.call(message, "stateRead"))
                $root.types.PluginStateReadRequest.encode(message.stateRead, writer.uint32(/* id 8, wireType 2 =*/66).fork(), q + 1).ldelim();
            if (message.stateWrite != null && Object.hasOwnProperty.call(message, "stateWrite"))
                $root.types.PluginStateWriteRequest.encode(message.stateWrite, writer.uint32(/* id 9, wireType 2 =*/74).fork(), q + 1).ldelim();
            if (message.query != null && Object.hasOwnProperty.call(message, "query"))
                $root.types.PluginQueryRequest.encode(message.query, writer.uint32(/* id 10, wireType 2 =*/82).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginToFSM message, length delimited. Does not implicitly {@link types.PluginToFSM.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginToFSM
         * @static
         * @param {types.IPluginToFSM} message PluginToFSM message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginToFSM.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginToFSM message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginToFSM
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginToFSM} PluginToFSM
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginToFSM.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginToFSM();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.uint64();
                        break;
                    }
                case 2: {
                        message.config = $root.types.PluginConfig.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.genesis = $root.types.PluginGenesisResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 4: {
                        message.begin = $root.types.PluginBeginResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 5: {
                        message.check = $root.types.PluginCheckResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 6: {
                        message.deliver = $root.types.PluginDeliverResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 7: {
                        message.end = $root.types.PluginEndResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 8: {
                        message.stateRead = $root.types.PluginStateReadRequest.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 9: {
                        message.stateWrite = $root.types.PluginStateWriteRequest.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 10: {
                        message.query = $root.types.PluginQueryRequest.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginToFSM message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginToFSM
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginToFSM} PluginToFSM
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginToFSM.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginToFSM message.
         * @function verify
         * @memberof types.PluginToFSM
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginToFSM.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.config != null && Object.hasOwnProperty.call(message, "config")) {
                properties.payload = 1;
                {
                    let error = $root.types.PluginConfig.verify(message.config, long + 1);
                    if (error)
                        return "config." + error;
                }
            }
            if (message.genesis != null && Object.hasOwnProperty.call(message, "genesis")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginGenesisResponse.verify(message.genesis, long + 1);
                    if (error)
                        return "genesis." + error;
                }
            }
            if (message.begin != null && Object.hasOwnProperty.call(message, "begin")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginBeginResponse.verify(message.begin, long + 1);
                    if (error)
                        return "begin." + error;
                }
            }
            if (message.check != null && Object.hasOwnProperty.call(message, "check")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginCheckResponse.verify(message.check, long + 1);
                    if (error)
                        return "check." + error;
                }
            }
            if (message.deliver != null && Object.hasOwnProperty.call(message, "deliver")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginDeliverResponse.verify(message.deliver, long + 1);
                    if (error)
                        return "deliver." + error;
                }
            }
            if (message.end != null && Object.hasOwnProperty.call(message, "end")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginEndResponse.verify(message.end, long + 1);
                    if (error)
                        return "end." + error;
                }
            }
            if (message.stateRead != null && Object.hasOwnProperty.call(message, "stateRead")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginStateReadRequest.verify(message.stateRead, long + 1);
                    if (error)
                        return "stateRead." + error;
                }
            }
            if (message.stateWrite != null && Object.hasOwnProperty.call(message, "stateWrite")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginStateWriteRequest.verify(message.stateWrite, long + 1);
                    if (error)
                        return "stateWrite." + error;
                }
            }
            if (message.query != null && Object.hasOwnProperty.call(message, "query")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    let error = $root.types.PluginQueryRequest.verify(message.query, long + 1);
                    if (error)
                        return "query." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PluginToFSM message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginToFSM
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginToFSM} PluginToFSM
         */
        PluginToFSM.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginToFSM)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginToFSM: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginToFSM();
            if (object.id != null)
                if ($util.Long)
                    message.id = $util.Long.fromValue(object.id, true);
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
            if (object.config != null) {
                if (!$util.isObject(object.config))
                    throw TypeError(".types.PluginToFSM.config: object expected");
                message.config = $root.types.PluginConfig.fromObject(object.config, long + 1);
            }
            if (object.genesis != null) {
                if (!$util.isObject(object.genesis))
                    throw TypeError(".types.PluginToFSM.genesis: object expected");
                message.genesis = $root.types.PluginGenesisResponse.fromObject(object.genesis, long + 1);
            }
            if (object.begin != null) {
                if (!$util.isObject(object.begin))
                    throw TypeError(".types.PluginToFSM.begin: object expected");
                message.begin = $root.types.PluginBeginResponse.fromObject(object.begin, long + 1);
            }
            if (object.check != null) {
                if (!$util.isObject(object.check))
                    throw TypeError(".types.PluginToFSM.check: object expected");
                message.check = $root.types.PluginCheckResponse.fromObject(object.check, long + 1);
            }
            if (object.deliver != null) {
                if (!$util.isObject(object.deliver))
                    throw TypeError(".types.PluginToFSM.deliver: object expected");
                message.deliver = $root.types.PluginDeliverResponse.fromObject(object.deliver, long + 1);
            }
            if (object.end != null) {
                if (!$util.isObject(object.end))
                    throw TypeError(".types.PluginToFSM.end: object expected");
                message.end = $root.types.PluginEndResponse.fromObject(object.end, long + 1);
            }
            if (object.stateRead != null) {
                if (!$util.isObject(object.stateRead))
                    throw TypeError(".types.PluginToFSM.stateRead: object expected");
                message.stateRead = $root.types.PluginStateReadRequest.fromObject(object.stateRead, long + 1);
            }
            if (object.stateWrite != null) {
                if (!$util.isObject(object.stateWrite))
                    throw TypeError(".types.PluginToFSM.stateWrite: object expected");
                message.stateWrite = $root.types.PluginStateWriteRequest.fromObject(object.stateWrite, long + 1);
            }
            if (object.query != null) {
                if (!$util.isObject(object.query))
                    throw TypeError(".types.PluginToFSM.query: object expected");
                message.query = $root.types.PluginQueryRequest.fromObject(object.query, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginToFSM message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginToFSM
         * @static
         * @param {types.PluginToFSM} message PluginToFSM
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginToFSM.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.id = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.id = typeof message.id === "number" ? BigInt(message.id) : $util.Long.fromBits(message.id.low >>> 0, message.id.high >>> 0, true).toBigInt();
                else if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
            if (message.config != null && Object.hasOwnProperty.call(message, "config")) {
                object.config = $root.types.PluginConfig.toObject(message.config, options, q + 1);
                if (options.oneofs)
                    object.payload = "config";
            }
            if (message.genesis != null && Object.hasOwnProperty.call(message, "genesis")) {
                object.genesis = $root.types.PluginGenesisResponse.toObject(message.genesis, options, q + 1);
                if (options.oneofs)
                    object.payload = "genesis";
            }
            if (message.begin != null && Object.hasOwnProperty.call(message, "begin")) {
                object.begin = $root.types.PluginBeginResponse.toObject(message.begin, options, q + 1);
                if (options.oneofs)
                    object.payload = "begin";
            }
            if (message.check != null && Object.hasOwnProperty.call(message, "check")) {
                object.check = $root.types.PluginCheckResponse.toObject(message.check, options, q + 1);
                if (options.oneofs)
                    object.payload = "check";
            }
            if (message.deliver != null && Object.hasOwnProperty.call(message, "deliver")) {
                object.deliver = $root.types.PluginDeliverResponse.toObject(message.deliver, options, q + 1);
                if (options.oneofs)
                    object.payload = "deliver";
            }
            if (message.end != null && Object.hasOwnProperty.call(message, "end")) {
                object.end = $root.types.PluginEndResponse.toObject(message.end, options, q + 1);
                if (options.oneofs)
                    object.payload = "end";
            }
            if (message.stateRead != null && Object.hasOwnProperty.call(message, "stateRead")) {
                object.stateRead = $root.types.PluginStateReadRequest.toObject(message.stateRead, options, q + 1);
                if (options.oneofs)
                    object.payload = "stateRead";
            }
            if (message.stateWrite != null && Object.hasOwnProperty.call(message, "stateWrite")) {
                object.stateWrite = $root.types.PluginStateWriteRequest.toObject(message.stateWrite, options, q + 1);
                if (options.oneofs)
                    object.payload = "stateWrite";
            }
            if (message.query != null && Object.hasOwnProperty.call(message, "query")) {
                object.query = $root.types.PluginQueryRequest.toObject(message.query, options, q + 1);
                if (options.oneofs)
                    object.payload = "query";
            }
            return object;
        };

        /**
         * Converts this PluginToFSM to JSON.
         * @function toJSON
         * @memberof types.PluginToFSM
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginToFSM.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginToFSM
         * @function getTypeUrl
         * @memberof types.PluginToFSM
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginToFSM.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginToFSM";
        };

        return PluginToFSM;
    })();

    types.PluginConfig = (function() {

        /**
         * Properties of a PluginConfig.
         * @memberof types
         * @interface IPluginConfig
         * @property {string|null} [name] PluginConfig name
         * @property {number|Long|null} [id] PluginConfig id
         * @property {number|Long|null} [version] PluginConfig version
         * @property {Array.<string>|null} [supportedTransactions] PluginConfig supportedTransactions
         * @property {Array.<Uint8Array>|null} [fileDescriptorProtos] PluginConfig fileDescriptorProtos
         * @property {Array.<string>|null} [transactionTypeUrls] PluginConfig transactionTypeUrls
         * @property {Array.<string>|null} [eventTypeUrls] PluginConfig eventTypeUrls
         * @property {Array.<Uint8Array>|null} [customStatePrefixes] PluginConfig customStatePrefixes
         */

        /**
         * Constructs a new PluginConfig.
         * @memberof types
         * @classdesc Represents a PluginConfig.
         * @implements IPluginConfig
         * @constructor
         * @param {types.IPluginConfig=} [properties] Properties to set
         */
        function PluginConfig(properties) {
            this.supportedTransactions = [];
            this.fileDescriptorProtos = [];
            this.transactionTypeUrls = [];
            this.eventTypeUrls = [];
            this.customStatePrefixes = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginConfig name.
         * @member {string} name
         * @memberof types.PluginConfig
         * @instance
         */
        PluginConfig.prototype.name = "";

        /**
         * PluginConfig id.
         * @member {number|Long} id
         * @memberof types.PluginConfig
         * @instance
         */
        PluginConfig.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginConfig version.
         * @member {number|Long} version
         * @memberof types.PluginConfig
         * @instance
         */
        PluginConfig.prototype.version = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginConfig supportedTransactions.
         * @member {Array.<string>} supportedTransactions
         * @memberof types.PluginConfig
         * @instance
         */
        PluginConfig.prototype.supportedTransactions = $util.emptyArray;

        /**
         * PluginConfig fileDescriptorProtos.
         * @member {Array.<Uint8Array>} fileDescriptorProtos
         * @memberof types.PluginConfig
         * @instance
         */
        PluginConfig.prototype.fileDescriptorProtos = $util.emptyArray;

        /**
         * PluginConfig transactionTypeUrls.
         * @member {Array.<string>} transactionTypeUrls
         * @memberof types.PluginConfig
         * @instance
         */
        PluginConfig.prototype.transactionTypeUrls = $util.emptyArray;

        /**
         * PluginConfig eventTypeUrls.
         * @member {Array.<string>} eventTypeUrls
         * @memberof types.PluginConfig
         * @instance
         */
        PluginConfig.prototype.eventTypeUrls = $util.emptyArray;

        /**
         * PluginConfig customStatePrefixes.
         * @member {Array.<Uint8Array>} customStatePrefixes
         * @memberof types.PluginConfig
         * @instance
         */
        PluginConfig.prototype.customStatePrefixes = $util.emptyArray;

        /**
         * Creates a new PluginConfig instance using the specified properties.
         * @function create
         * @memberof types.PluginConfig
         * @static
         * @param {types.IPluginConfig=} [properties] Properties to set
         * @returns {types.PluginConfig} PluginConfig instance
         */
        PluginConfig.create = function create(properties) {
            return new PluginConfig(properties);
        };

        /**
         * Encodes the specified PluginConfig message. Does not implicitly {@link types.PluginConfig.verify|verify} messages.
         * @function encode
         * @memberof types.PluginConfig
         * @static
         * @param {types.IPluginConfig} message PluginConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginConfig.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.id);
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.version);
            if (message.supportedTransactions != null && message.supportedTransactions.length)
                for (let i = 0; i < message.supportedTransactions.length; ++i)
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.supportedTransactions[i]);
            if (message.fileDescriptorProtos != null && message.fileDescriptorProtos.length)
                for (let i = 0; i < message.fileDescriptorProtos.length; ++i)
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.fileDescriptorProtos[i]);
            if (message.transactionTypeUrls != null && message.transactionTypeUrls.length)
                for (let i = 0; i < message.transactionTypeUrls.length; ++i)
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.transactionTypeUrls[i]);
            if (message.eventTypeUrls != null && message.eventTypeUrls.length)
                for (let i = 0; i < message.eventTypeUrls.length; ++i)
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.eventTypeUrls[i]);
            if (message.customStatePrefixes != null && message.customStatePrefixes.length)
                for (let i = 0; i < message.customStatePrefixes.length; ++i)
                    writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.customStatePrefixes[i]);
            return writer;
        };

        /**
         * Encodes the specified PluginConfig message, length delimited. Does not implicitly {@link types.PluginConfig.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginConfig
         * @static
         * @param {types.IPluginConfig} message PluginConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginConfig.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginConfig message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginConfig} PluginConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginConfig.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginConfig();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.name = reader.string();
                        break;
                    }
                case 2: {
                        message.id = reader.uint64();
                        break;
                    }
                case 3: {
                        message.version = reader.uint64();
                        break;
                    }
                case 4: {
                        if (!(message.supportedTransactions && message.supportedTransactions.length))
                            message.supportedTransactions = [];
                        message.supportedTransactions.push(reader.string());
                        break;
                    }
                case 5: {
                        if (!(message.fileDescriptorProtos && message.fileDescriptorProtos.length))
                            message.fileDescriptorProtos = [];
                        message.fileDescriptorProtos.push(reader.bytes());
                        break;
                    }
                case 6: {
                        if (!(message.transactionTypeUrls && message.transactionTypeUrls.length))
                            message.transactionTypeUrls = [];
                        message.transactionTypeUrls.push(reader.string());
                        break;
                    }
                case 7: {
                        if (!(message.eventTypeUrls && message.eventTypeUrls.length))
                            message.eventTypeUrls = [];
                        message.eventTypeUrls.push(reader.string());
                        break;
                    }
                case 8: {
                        if (!(message.customStatePrefixes && message.customStatePrefixes.length))
                            message.customStatePrefixes = [];
                        message.customStatePrefixes.push(reader.bytes());
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginConfig message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginConfig} PluginConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginConfig.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginConfig message.
         * @function verify
         * @memberof types.PluginConfig
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginConfig.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                if (!$util.isInteger(message.version) && !(message.version && $util.isInteger(message.version.low) && $util.isInteger(message.version.high)))
                    return "version: integer|Long expected";
            if (message.supportedTransactions != null && Object.hasOwnProperty.call(message, "supportedTransactions")) {
                if (!Array.isArray(message.supportedTransactions))
                    return "supportedTransactions: array expected";
                for (let i = 0; i < message.supportedTransactions.length; ++i)
                    if (!$util.isString(message.supportedTransactions[i]))
                        return "supportedTransactions: string[] expected";
            }
            if (message.fileDescriptorProtos != null && Object.hasOwnProperty.call(message, "fileDescriptorProtos")) {
                if (!Array.isArray(message.fileDescriptorProtos))
                    return "fileDescriptorProtos: array expected";
                for (let i = 0; i < message.fileDescriptorProtos.length; ++i)
                    if (!(message.fileDescriptorProtos[i] && typeof message.fileDescriptorProtos[i].length === "number" || $util.isString(message.fileDescriptorProtos[i])))
                        return "fileDescriptorProtos: buffer[] expected";
            }
            if (message.transactionTypeUrls != null && Object.hasOwnProperty.call(message, "transactionTypeUrls")) {
                if (!Array.isArray(message.transactionTypeUrls))
                    return "transactionTypeUrls: array expected";
                for (let i = 0; i < message.transactionTypeUrls.length; ++i)
                    if (!$util.isString(message.transactionTypeUrls[i]))
                        return "transactionTypeUrls: string[] expected";
            }
            if (message.eventTypeUrls != null && Object.hasOwnProperty.call(message, "eventTypeUrls")) {
                if (!Array.isArray(message.eventTypeUrls))
                    return "eventTypeUrls: array expected";
                for (let i = 0; i < message.eventTypeUrls.length; ++i)
                    if (!$util.isString(message.eventTypeUrls[i]))
                        return "eventTypeUrls: string[] expected";
            }
            if (message.customStatePrefixes != null && Object.hasOwnProperty.call(message, "customStatePrefixes")) {
                if (!Array.isArray(message.customStatePrefixes))
                    return "customStatePrefixes: array expected";
                for (let i = 0; i < message.customStatePrefixes.length; ++i)
                    if (!(message.customStatePrefixes[i] && typeof message.customStatePrefixes[i].length === "number" || $util.isString(message.customStatePrefixes[i])))
                        return "customStatePrefixes: buffer[] expected";
            }
            return null;
        };

        /**
         * Creates a PluginConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginConfig} PluginConfig
         */
        PluginConfig.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginConfig)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginConfig: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginConfig();
            if (object.name != null)
                message.name = String(object.name);
            if (object.id != null)
                if ($util.Long)
                    message.id = $util.Long.fromValue(object.id, true);
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
            if (object.version != null)
                if ($util.Long)
                    message.version = $util.Long.fromValue(object.version, true);
                else if (typeof object.version === "string")
                    message.version = parseInt(object.version, 10);
                else if (typeof object.version === "number")
                    message.version = object.version;
                else if (typeof object.version === "object")
                    message.version = new $util.LongBits(object.version.low >>> 0, object.version.high >>> 0).toNumber(true);
            if (object.supportedTransactions) {
                if (!Array.isArray(object.supportedTransactions))
                    throw TypeError(".types.PluginConfig.supportedTransactions: array expected");
                message.supportedTransactions = [];
                for (let i = 0; i < object.supportedTransactions.length; ++i)
                    message.supportedTransactions[i] = String(object.supportedTransactions[i]);
            }
            if (object.fileDescriptorProtos) {
                if (!Array.isArray(object.fileDescriptorProtos))
                    throw TypeError(".types.PluginConfig.fileDescriptorProtos: array expected");
                message.fileDescriptorProtos = [];
                for (let i = 0; i < object.fileDescriptorProtos.length; ++i)
                    if (typeof object.fileDescriptorProtos[i] === "string")
                        $util.base64.decode(object.fileDescriptorProtos[i], message.fileDescriptorProtos[i] = $util.newBuffer($util.base64.length(object.fileDescriptorProtos[i])), 0);
                    else if (object.fileDescriptorProtos[i].length >= 0)
                        message.fileDescriptorProtos[i] = object.fileDescriptorProtos[i];
            }
            if (object.transactionTypeUrls) {
                if (!Array.isArray(object.transactionTypeUrls))
                    throw TypeError(".types.PluginConfig.transactionTypeUrls: array expected");
                message.transactionTypeUrls = [];
                for (let i = 0; i < object.transactionTypeUrls.length; ++i)
                    message.transactionTypeUrls[i] = String(object.transactionTypeUrls[i]);
            }
            if (object.eventTypeUrls) {
                if (!Array.isArray(object.eventTypeUrls))
                    throw TypeError(".types.PluginConfig.eventTypeUrls: array expected");
                message.eventTypeUrls = [];
                for (let i = 0; i < object.eventTypeUrls.length; ++i)
                    message.eventTypeUrls[i] = String(object.eventTypeUrls[i]);
            }
            if (object.customStatePrefixes) {
                if (!Array.isArray(object.customStatePrefixes))
                    throw TypeError(".types.PluginConfig.customStatePrefixes: array expected");
                message.customStatePrefixes = [];
                for (let i = 0; i < object.customStatePrefixes.length; ++i)
                    if (typeof object.customStatePrefixes[i] === "string")
                        $util.base64.decode(object.customStatePrefixes[i], message.customStatePrefixes[i] = $util.newBuffer($util.base64.length(object.customStatePrefixes[i])), 0);
                    else if (object.customStatePrefixes[i].length >= 0)
                        message.customStatePrefixes[i] = object.customStatePrefixes[i];
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginConfig
         * @static
         * @param {types.PluginConfig} message PluginConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginConfig.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.supportedTransactions = [];
                object.fileDescriptorProtos = [];
                object.transactionTypeUrls = [];
                object.eventTypeUrls = [];
                object.customStatePrefixes = [];
            }
            if (options.defaults) {
                object.name = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.id = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.version = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.version = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.id = typeof message.id === "number" ? BigInt(message.id) : $util.Long.fromBits(message.id.low >>> 0, message.id.high >>> 0, true).toBigInt();
                else if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.version = typeof message.version === "number" ? BigInt(message.version) : $util.Long.fromBits(message.version.low >>> 0, message.version.high >>> 0, true).toBigInt();
                else if (typeof message.version === "number")
                    object.version = options.longs === String ? String(message.version) : message.version;
                else
                    object.version = options.longs === String ? $util.Long.prototype.toString.call(message.version) : options.longs === Number ? new $util.LongBits(message.version.low >>> 0, message.version.high >>> 0).toNumber(true) : message.version;
            if (message.supportedTransactions && message.supportedTransactions.length) {
                object.supportedTransactions = [];
                for (let j = 0; j < message.supportedTransactions.length; ++j)
                    object.supportedTransactions[j] = message.supportedTransactions[j];
            }
            if (message.fileDescriptorProtos && message.fileDescriptorProtos.length) {
                object.fileDescriptorProtos = [];
                for (let j = 0; j < message.fileDescriptorProtos.length; ++j)
                    object.fileDescriptorProtos[j] = options.bytes === String ? $util.base64.encode(message.fileDescriptorProtos[j], 0, message.fileDescriptorProtos[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.fileDescriptorProtos[j]) : message.fileDescriptorProtos[j];
            }
            if (message.transactionTypeUrls && message.transactionTypeUrls.length) {
                object.transactionTypeUrls = [];
                for (let j = 0; j < message.transactionTypeUrls.length; ++j)
                    object.transactionTypeUrls[j] = message.transactionTypeUrls[j];
            }
            if (message.eventTypeUrls && message.eventTypeUrls.length) {
                object.eventTypeUrls = [];
                for (let j = 0; j < message.eventTypeUrls.length; ++j)
                    object.eventTypeUrls[j] = message.eventTypeUrls[j];
            }
            if (message.customStatePrefixes && message.customStatePrefixes.length) {
                object.customStatePrefixes = [];
                for (let j = 0; j < message.customStatePrefixes.length; ++j)
                    object.customStatePrefixes[j] = options.bytes === String ? $util.base64.encode(message.customStatePrefixes[j], 0, message.customStatePrefixes[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.customStatePrefixes[j]) : message.customStatePrefixes[j];
            }
            return object;
        };

        /**
         * Converts this PluginConfig to JSON.
         * @function toJSON
         * @memberof types.PluginConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginConfig
         * @function getTypeUrl
         * @memberof types.PluginConfig
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginConfig";
        };

        return PluginConfig;
    })();

    types.PluginFSMConfig = (function() {

        /**
         * Properties of a PluginFSMConfig.
         * @memberof types
         * @interface IPluginFSMConfig
         * @property {types.IPluginConfig|null} [config] PluginFSMConfig config
         */

        /**
         * Constructs a new PluginFSMConfig.
         * @memberof types
         * @classdesc Represents a PluginFSMConfig.
         * @implements IPluginFSMConfig
         * @constructor
         * @param {types.IPluginFSMConfig=} [properties] Properties to set
         */
        function PluginFSMConfig(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginFSMConfig config.
         * @member {types.IPluginConfig|null|undefined} config
         * @memberof types.PluginFSMConfig
         * @instance
         */
        PluginFSMConfig.prototype.config = null;

        /**
         * Creates a new PluginFSMConfig instance using the specified properties.
         * @function create
         * @memberof types.PluginFSMConfig
         * @static
         * @param {types.IPluginFSMConfig=} [properties] Properties to set
         * @returns {types.PluginFSMConfig} PluginFSMConfig instance
         */
        PluginFSMConfig.create = function create(properties) {
            return new PluginFSMConfig(properties);
        };

        /**
         * Encodes the specified PluginFSMConfig message. Does not implicitly {@link types.PluginFSMConfig.verify|verify} messages.
         * @function encode
         * @memberof types.PluginFSMConfig
         * @static
         * @param {types.IPluginFSMConfig} message PluginFSMConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginFSMConfig.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                $root.types.PluginConfig.encode(message.config, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginFSMConfig message, length delimited. Does not implicitly {@link types.PluginFSMConfig.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginFSMConfig
         * @static
         * @param {types.IPluginFSMConfig} message PluginFSMConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginFSMConfig.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginFSMConfig message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginFSMConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginFSMConfig} PluginFSMConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginFSMConfig.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginFSMConfig();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.config = $root.types.PluginConfig.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginFSMConfig message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginFSMConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginFSMConfig} PluginFSMConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginFSMConfig.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginFSMConfig message.
         * @function verify
         * @memberof types.PluginFSMConfig
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginFSMConfig.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.config != null && Object.hasOwnProperty.call(message, "config")) {
                let error = $root.types.PluginConfig.verify(message.config, long + 1);
                if (error)
                    return "config." + error;
            }
            return null;
        };

        /**
         * Creates a PluginFSMConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginFSMConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginFSMConfig} PluginFSMConfig
         */
        PluginFSMConfig.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginFSMConfig)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginFSMConfig: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginFSMConfig();
            if (object.config != null) {
                if (!$util.isObject(object.config))
                    throw TypeError(".types.PluginFSMConfig.config: object expected");
                message.config = $root.types.PluginConfig.fromObject(object.config, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginFSMConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginFSMConfig
         * @static
         * @param {types.PluginFSMConfig} message PluginFSMConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginFSMConfig.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.config = null;
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                object.config = $root.types.PluginConfig.toObject(message.config, options, q + 1);
            return object;
        };

        /**
         * Converts this PluginFSMConfig to JSON.
         * @function toJSON
         * @memberof types.PluginFSMConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginFSMConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginFSMConfig
         * @function getTypeUrl
         * @memberof types.PluginFSMConfig
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginFSMConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginFSMConfig";
        };

        return PluginFSMConfig;
    })();

    types.PluginGenesisRequest = (function() {

        /**
         * Properties of a PluginGenesisRequest.
         * @memberof types
         * @interface IPluginGenesisRequest
         * @property {Uint8Array|null} [genesisJson] PluginGenesisRequest genesisJson
         */

        /**
         * Constructs a new PluginGenesisRequest.
         * @memberof types
         * @classdesc Represents a PluginGenesisRequest.
         * @implements IPluginGenesisRequest
         * @constructor
         * @param {types.IPluginGenesisRequest=} [properties] Properties to set
         */
        function PluginGenesisRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginGenesisRequest genesisJson.
         * @member {Uint8Array} genesisJson
         * @memberof types.PluginGenesisRequest
         * @instance
         */
        PluginGenesisRequest.prototype.genesisJson = $util.newBuffer([]);

        /**
         * Creates a new PluginGenesisRequest instance using the specified properties.
         * @function create
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {types.IPluginGenesisRequest=} [properties] Properties to set
         * @returns {types.PluginGenesisRequest} PluginGenesisRequest instance
         */
        PluginGenesisRequest.create = function create(properties) {
            return new PluginGenesisRequest(properties);
        };

        /**
         * Encodes the specified PluginGenesisRequest message. Does not implicitly {@link types.PluginGenesisRequest.verify|verify} messages.
         * @function encode
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {types.IPluginGenesisRequest} message PluginGenesisRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginGenesisRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.genesisJson != null && Object.hasOwnProperty.call(message, "genesisJson"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.genesisJson);
            return writer;
        };

        /**
         * Encodes the specified PluginGenesisRequest message, length delimited. Does not implicitly {@link types.PluginGenesisRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {types.IPluginGenesisRequest} message PluginGenesisRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginGenesisRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginGenesisRequest message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginGenesisRequest} PluginGenesisRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginGenesisRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginGenesisRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.genesisJson = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginGenesisRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginGenesisRequest} PluginGenesisRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginGenesisRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginGenesisRequest message.
         * @function verify
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginGenesisRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.genesisJson != null && Object.hasOwnProperty.call(message, "genesisJson"))
                if (!(message.genesisJson && typeof message.genesisJson.length === "number" || $util.isString(message.genesisJson)))
                    return "genesisJson: buffer expected";
            return null;
        };

        /**
         * Creates a PluginGenesisRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginGenesisRequest} PluginGenesisRequest
         */
        PluginGenesisRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginGenesisRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginGenesisRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginGenesisRequest();
            if (object.genesisJson != null)
                if (typeof object.genesisJson === "string")
                    $util.base64.decode(object.genesisJson, message.genesisJson = $util.newBuffer($util.base64.length(object.genesisJson)), 0);
                else if (object.genesisJson.length >= 0)
                    message.genesisJson = object.genesisJson;
            return message;
        };

        /**
         * Creates a plain object from a PluginGenesisRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {types.PluginGenesisRequest} message PluginGenesisRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginGenesisRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.genesisJson = "";
                else {
                    object.genesisJson = [];
                    if (options.bytes !== Array)
                        object.genesisJson = $util.newBuffer(object.genesisJson);
                }
            if (message.genesisJson != null && Object.hasOwnProperty.call(message, "genesisJson"))
                object.genesisJson = options.bytes === String ? $util.base64.encode(message.genesisJson, 0, message.genesisJson.length) : options.bytes === Array ? Array.prototype.slice.call(message.genesisJson) : message.genesisJson;
            return object;
        };

        /**
         * Converts this PluginGenesisRequest to JSON.
         * @function toJSON
         * @memberof types.PluginGenesisRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginGenesisRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginGenesisRequest
         * @function getTypeUrl
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginGenesisRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginGenesisRequest";
        };

        return PluginGenesisRequest;
    })();

    types.PluginGenesisResponse = (function() {

        /**
         * Properties of a PluginGenesisResponse.
         * @memberof types
         * @interface IPluginGenesisResponse
         * @property {types.IPluginError|null} [error] PluginGenesisResponse error
         */

        /**
         * Constructs a new PluginGenesisResponse.
         * @memberof types
         * @classdesc Represents a PluginGenesisResponse.
         * @implements IPluginGenesisResponse
         * @constructor
         * @param {types.IPluginGenesisResponse=} [properties] Properties to set
         */
        function PluginGenesisResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginGenesisResponse error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.PluginGenesisResponse
         * @instance
         */
        PluginGenesisResponse.prototype.error = null;

        /**
         * Creates a new PluginGenesisResponse instance using the specified properties.
         * @function create
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {types.IPluginGenesisResponse=} [properties] Properties to set
         * @returns {types.PluginGenesisResponse} PluginGenesisResponse instance
         */
        PluginGenesisResponse.create = function create(properties) {
            return new PluginGenesisResponse(properties);
        };

        /**
         * Encodes the specified PluginGenesisResponse message. Does not implicitly {@link types.PluginGenesisResponse.verify|verify} messages.
         * @function encode
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {types.IPluginGenesisResponse} message PluginGenesisResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginGenesisResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginGenesisResponse message, length delimited. Does not implicitly {@link types.PluginGenesisResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {types.IPluginGenesisResponse} message PluginGenesisResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginGenesisResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginGenesisResponse message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginGenesisResponse} PluginGenesisResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginGenesisResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginGenesisResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginGenesisResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginGenesisResponse} PluginGenesisResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginGenesisResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginGenesisResponse message.
         * @function verify
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginGenesisResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.error != null && Object.hasOwnProperty.call(message, "error")) {
                let error = $root.types.PluginError.verify(message.error, long + 1);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a PluginGenesisResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginGenesisResponse} PluginGenesisResponse
         */
        PluginGenesisResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginGenesisResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginGenesisResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginGenesisResponse();
            if (object.error != null) {
                if (!$util.isObject(object.error))
                    throw TypeError(".types.PluginGenesisResponse.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginGenesisResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {types.PluginGenesisResponse} message PluginGenesisResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginGenesisResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.error = null;
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                object.error = $root.types.PluginError.toObject(message.error, options, q + 1);
            return object;
        };

        /**
         * Converts this PluginGenesisResponse to JSON.
         * @function toJSON
         * @memberof types.PluginGenesisResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginGenesisResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginGenesisResponse
         * @function getTypeUrl
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginGenesisResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginGenesisResponse";
        };

        return PluginGenesisResponse;
    })();

    types.PluginBeginRequest = (function() {

        /**
         * Properties of a PluginBeginRequest.
         * @memberof types
         * @interface IPluginBeginRequest
         * @property {number|Long|null} [height] PluginBeginRequest height
         */

        /**
         * Constructs a new PluginBeginRequest.
         * @memberof types
         * @classdesc Represents a PluginBeginRequest.
         * @implements IPluginBeginRequest
         * @constructor
         * @param {types.IPluginBeginRequest=} [properties] Properties to set
         */
        function PluginBeginRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginBeginRequest height.
         * @member {number|Long} height
         * @memberof types.PluginBeginRequest
         * @instance
         */
        PluginBeginRequest.prototype.height = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new PluginBeginRequest instance using the specified properties.
         * @function create
         * @memberof types.PluginBeginRequest
         * @static
         * @param {types.IPluginBeginRequest=} [properties] Properties to set
         * @returns {types.PluginBeginRequest} PluginBeginRequest instance
         */
        PluginBeginRequest.create = function create(properties) {
            return new PluginBeginRequest(properties);
        };

        /**
         * Encodes the specified PluginBeginRequest message. Does not implicitly {@link types.PluginBeginRequest.verify|verify} messages.
         * @function encode
         * @memberof types.PluginBeginRequest
         * @static
         * @param {types.IPluginBeginRequest} message PluginBeginRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginBeginRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.height);
            return writer;
        };

        /**
         * Encodes the specified PluginBeginRequest message, length delimited. Does not implicitly {@link types.PluginBeginRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginBeginRequest
         * @static
         * @param {types.IPluginBeginRequest} message PluginBeginRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginBeginRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginBeginRequest message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginBeginRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginBeginRequest} PluginBeginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginBeginRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginBeginRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.height = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginBeginRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginBeginRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginBeginRequest} PluginBeginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginBeginRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginBeginRequest message.
         * @function verify
         * @memberof types.PluginBeginRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginBeginRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                    return "height: integer|Long expected";
            return null;
        };

        /**
         * Creates a PluginBeginRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginBeginRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginBeginRequest} PluginBeginRequest
         */
        PluginBeginRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginBeginRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginBeginRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginBeginRequest();
            if (object.height != null)
                if ($util.Long)
                    message.height = $util.Long.fromValue(object.height, true);
                else if (typeof object.height === "string")
                    message.height = parseInt(object.height, 10);
                else if (typeof object.height === "number")
                    message.height = object.height;
                else if (typeof object.height === "object")
                    message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a PluginBeginRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginBeginRequest
         * @static
         * @param {types.PluginBeginRequest} message PluginBeginRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginBeginRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.height = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.height = typeof message.height === "number" ? BigInt(message.height) : $util.Long.fromBits(message.height.low >>> 0, message.height.high >>> 0, true).toBigInt();
                else if (typeof message.height === "number")
                    object.height = options.longs === String ? String(message.height) : message.height;
                else
                    object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber(true) : message.height;
            return object;
        };

        /**
         * Converts this PluginBeginRequest to JSON.
         * @function toJSON
         * @memberof types.PluginBeginRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginBeginRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginBeginRequest
         * @function getTypeUrl
         * @memberof types.PluginBeginRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginBeginRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginBeginRequest";
        };

        return PluginBeginRequest;
    })();

    types.PluginBeginResponse = (function() {

        /**
         * Properties of a PluginBeginResponse.
         * @memberof types
         * @interface IPluginBeginResponse
         * @property {Array.<types.IEvent>|null} [events] PluginBeginResponse events
         * @property {types.IPluginError|null} [error] PluginBeginResponse error
         */

        /**
         * Constructs a new PluginBeginResponse.
         * @memberof types
         * @classdesc Represents a PluginBeginResponse.
         * @implements IPluginBeginResponse
         * @constructor
         * @param {types.IPluginBeginResponse=} [properties] Properties to set
         */
        function PluginBeginResponse(properties) {
            this.events = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginBeginResponse events.
         * @member {Array.<types.IEvent>} events
         * @memberof types.PluginBeginResponse
         * @instance
         */
        PluginBeginResponse.prototype.events = $util.emptyArray;

        /**
         * PluginBeginResponse error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.PluginBeginResponse
         * @instance
         */
        PluginBeginResponse.prototype.error = null;

        /**
         * Creates a new PluginBeginResponse instance using the specified properties.
         * @function create
         * @memberof types.PluginBeginResponse
         * @static
         * @param {types.IPluginBeginResponse=} [properties] Properties to set
         * @returns {types.PluginBeginResponse} PluginBeginResponse instance
         */
        PluginBeginResponse.create = function create(properties) {
            return new PluginBeginResponse(properties);
        };

        /**
         * Encodes the specified PluginBeginResponse message. Does not implicitly {@link types.PluginBeginResponse.verify|verify} messages.
         * @function encode
         * @memberof types.PluginBeginResponse
         * @static
         * @param {types.IPluginBeginResponse} message PluginBeginResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginBeginResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.events != null && message.events.length)
                for (let i = 0; i < message.events.length; ++i)
                    $root.types.Event.encode(message.events[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginBeginResponse message, length delimited. Does not implicitly {@link types.PluginBeginResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginBeginResponse
         * @static
         * @param {types.IPluginBeginResponse} message PluginBeginResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginBeginResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginBeginResponse message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginBeginResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginBeginResponse} PluginBeginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginBeginResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginBeginResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.events && message.events.length))
                            message.events = [];
                        message.events.push($root.types.Event.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginBeginResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginBeginResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginBeginResponse} PluginBeginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginBeginResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginBeginResponse message.
         * @function verify
         * @memberof types.PluginBeginResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginBeginResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.events != null && Object.hasOwnProperty.call(message, "events")) {
                if (!Array.isArray(message.events))
                    return "events: array expected";
                for (let i = 0; i < message.events.length; ++i) {
                    let error = $root.types.Event.verify(message.events[i], long + 1);
                    if (error)
                        return "events." + error;
                }
            }
            if (message.error != null && Object.hasOwnProperty.call(message, "error")) {
                let error = $root.types.PluginError.verify(message.error, long + 1);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a PluginBeginResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginBeginResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginBeginResponse} PluginBeginResponse
         */
        PluginBeginResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginBeginResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginBeginResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginBeginResponse();
            if (object.events) {
                if (!Array.isArray(object.events))
                    throw TypeError(".types.PluginBeginResponse.events: array expected");
                message.events = [];
                for (let i = 0; i < object.events.length; ++i) {
                    if (!$util.isObject(object.events[i]))
                        throw TypeError(".types.PluginBeginResponse.events: object expected");
                    message.events[i] = $root.types.Event.fromObject(object.events[i], long + 1);
                }
            }
            if (object.error != null) {
                if (!$util.isObject(object.error))
                    throw TypeError(".types.PluginBeginResponse.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginBeginResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginBeginResponse
         * @static
         * @param {types.PluginBeginResponse} message PluginBeginResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginBeginResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.events = [];
            if (options.defaults)
                object.error = null;
            if (message.events && message.events.length) {
                object.events = [];
                for (let j = 0; j < message.events.length; ++j)
                    object.events[j] = $root.types.Event.toObject(message.events[j], options, q + 1);
            }
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                object.error = $root.types.PluginError.toObject(message.error, options, q + 1);
            return object;
        };

        /**
         * Converts this PluginBeginResponse to JSON.
         * @function toJSON
         * @memberof types.PluginBeginResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginBeginResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginBeginResponse
         * @function getTypeUrl
         * @memberof types.PluginBeginResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginBeginResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginBeginResponse";
        };

        return PluginBeginResponse;
    })();

    types.PluginCheckRequest = (function() {

        /**
         * Properties of a PluginCheckRequest.
         * @memberof types
         * @interface IPluginCheckRequest
         * @property {types.ITransaction|null} [tx] PluginCheckRequest tx
         */

        /**
         * Constructs a new PluginCheckRequest.
         * @memberof types
         * @classdesc Represents a PluginCheckRequest.
         * @implements IPluginCheckRequest
         * @constructor
         * @param {types.IPluginCheckRequest=} [properties] Properties to set
         */
        function PluginCheckRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginCheckRequest tx.
         * @member {types.ITransaction|null|undefined} tx
         * @memberof types.PluginCheckRequest
         * @instance
         */
        PluginCheckRequest.prototype.tx = null;

        /**
         * Creates a new PluginCheckRequest instance using the specified properties.
         * @function create
         * @memberof types.PluginCheckRequest
         * @static
         * @param {types.IPluginCheckRequest=} [properties] Properties to set
         * @returns {types.PluginCheckRequest} PluginCheckRequest instance
         */
        PluginCheckRequest.create = function create(properties) {
            return new PluginCheckRequest(properties);
        };

        /**
         * Encodes the specified PluginCheckRequest message. Does not implicitly {@link types.PluginCheckRequest.verify|verify} messages.
         * @function encode
         * @memberof types.PluginCheckRequest
         * @static
         * @param {types.IPluginCheckRequest} message PluginCheckRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginCheckRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.tx != null && Object.hasOwnProperty.call(message, "tx"))
                $root.types.Transaction.encode(message.tx, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginCheckRequest message, length delimited. Does not implicitly {@link types.PluginCheckRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginCheckRequest
         * @static
         * @param {types.IPluginCheckRequest} message PluginCheckRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginCheckRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginCheckRequest message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginCheckRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginCheckRequest} PluginCheckRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginCheckRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginCheckRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.tx = $root.types.Transaction.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginCheckRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginCheckRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginCheckRequest} PluginCheckRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginCheckRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginCheckRequest message.
         * @function verify
         * @memberof types.PluginCheckRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginCheckRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.tx != null && Object.hasOwnProperty.call(message, "tx")) {
                let error = $root.types.Transaction.verify(message.tx, long + 1);
                if (error)
                    return "tx." + error;
            }
            return null;
        };

        /**
         * Creates a PluginCheckRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginCheckRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginCheckRequest} PluginCheckRequest
         */
        PluginCheckRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginCheckRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginCheckRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginCheckRequest();
            if (object.tx != null) {
                if (!$util.isObject(object.tx))
                    throw TypeError(".types.PluginCheckRequest.tx: object expected");
                message.tx = $root.types.Transaction.fromObject(object.tx, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginCheckRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginCheckRequest
         * @static
         * @param {types.PluginCheckRequest} message PluginCheckRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginCheckRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.tx = null;
            if (message.tx != null && Object.hasOwnProperty.call(message, "tx"))
                object.tx = $root.types.Transaction.toObject(message.tx, options, q + 1);
            return object;
        };

        /**
         * Converts this PluginCheckRequest to JSON.
         * @function toJSON
         * @memberof types.PluginCheckRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginCheckRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginCheckRequest
         * @function getTypeUrl
         * @memberof types.PluginCheckRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginCheckRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginCheckRequest";
        };

        return PluginCheckRequest;
    })();

    types.PluginCheckResponse = (function() {

        /**
         * Properties of a PluginCheckResponse.
         * @memberof types
         * @interface IPluginCheckResponse
         * @property {Array.<Uint8Array>|null} [authorizedSigners] PluginCheckResponse authorizedSigners
         * @property {Uint8Array|null} [recipient] PluginCheckResponse recipient
         * @property {types.IPluginError|null} [error] PluginCheckResponse error
         */

        /**
         * Constructs a new PluginCheckResponse.
         * @memberof types
         * @classdesc Represents a PluginCheckResponse.
         * @implements IPluginCheckResponse
         * @constructor
         * @param {types.IPluginCheckResponse=} [properties] Properties to set
         */
        function PluginCheckResponse(properties) {
            this.authorizedSigners = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginCheckResponse authorizedSigners.
         * @member {Array.<Uint8Array>} authorizedSigners
         * @memberof types.PluginCheckResponse
         * @instance
         */
        PluginCheckResponse.prototype.authorizedSigners = $util.emptyArray;

        /**
         * PluginCheckResponse recipient.
         * @member {Uint8Array} recipient
         * @memberof types.PluginCheckResponse
         * @instance
         */
        PluginCheckResponse.prototype.recipient = $util.newBuffer([]);

        /**
         * PluginCheckResponse error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.PluginCheckResponse
         * @instance
         */
        PluginCheckResponse.prototype.error = null;

        /**
         * Creates a new PluginCheckResponse instance using the specified properties.
         * @function create
         * @memberof types.PluginCheckResponse
         * @static
         * @param {types.IPluginCheckResponse=} [properties] Properties to set
         * @returns {types.PluginCheckResponse} PluginCheckResponse instance
         */
        PluginCheckResponse.create = function create(properties) {
            return new PluginCheckResponse(properties);
        };

        /**
         * Encodes the specified PluginCheckResponse message. Does not implicitly {@link types.PluginCheckResponse.verify|verify} messages.
         * @function encode
         * @memberof types.PluginCheckResponse
         * @static
         * @param {types.IPluginCheckResponse} message PluginCheckResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginCheckResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.authorizedSigners != null && message.authorizedSigners.length)
                for (let i = 0; i < message.authorizedSigners.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.authorizedSigners[i]);
            if (message.recipient != null && Object.hasOwnProperty.call(message, "recipient"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.recipient);
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginCheckResponse message, length delimited. Does not implicitly {@link types.PluginCheckResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginCheckResponse
         * @static
         * @param {types.IPluginCheckResponse} message PluginCheckResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginCheckResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginCheckResponse message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginCheckResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginCheckResponse} PluginCheckResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginCheckResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginCheckResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.authorizedSigners && message.authorizedSigners.length))
                            message.authorizedSigners = [];
                        message.authorizedSigners.push(reader.bytes());
                        break;
                    }
                case 2: {
                        message.recipient = reader.bytes();
                        break;
                    }
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginCheckResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginCheckResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginCheckResponse} PluginCheckResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginCheckResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginCheckResponse message.
         * @function verify
         * @memberof types.PluginCheckResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginCheckResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.authorizedSigners != null && Object.hasOwnProperty.call(message, "authorizedSigners")) {
                if (!Array.isArray(message.authorizedSigners))
                    return "authorizedSigners: array expected";
                for (let i = 0; i < message.authorizedSigners.length; ++i)
                    if (!(message.authorizedSigners[i] && typeof message.authorizedSigners[i].length === "number" || $util.isString(message.authorizedSigners[i])))
                        return "authorizedSigners: buffer[] expected";
            }
            if (message.recipient != null && Object.hasOwnProperty.call(message, "recipient"))
                if (!(message.recipient && typeof message.recipient.length === "number" || $util.isString(message.recipient)))
                    return "recipient: buffer expected";
            if (message.error != null && Object.hasOwnProperty.call(message, "error")) {
                let error = $root.types.PluginError.verify(message.error, long + 1);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a PluginCheckResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginCheckResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginCheckResponse} PluginCheckResponse
         */
        PluginCheckResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginCheckResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginCheckResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginCheckResponse();
            if (object.authorizedSigners) {
                if (!Array.isArray(object.authorizedSigners))
                    throw TypeError(".types.PluginCheckResponse.authorizedSigners: array expected");
                message.authorizedSigners = [];
                for (let i = 0; i < object.authorizedSigners.length; ++i)
                    if (typeof object.authorizedSigners[i] === "string")
                        $util.base64.decode(object.authorizedSigners[i], message.authorizedSigners[i] = $util.newBuffer($util.base64.length(object.authorizedSigners[i])), 0);
                    else if (object.authorizedSigners[i].length >= 0)
                        message.authorizedSigners[i] = object.authorizedSigners[i];
            }
            if (object.recipient != null)
                if (typeof object.recipient === "string")
                    $util.base64.decode(object.recipient, message.recipient = $util.newBuffer($util.base64.length(object.recipient)), 0);
                else if (object.recipient.length >= 0)
                    message.recipient = object.recipient;
            if (object.error != null) {
                if (!$util.isObject(object.error))
                    throw TypeError(".types.PluginCheckResponse.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginCheckResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginCheckResponse
         * @static
         * @param {types.PluginCheckResponse} message PluginCheckResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginCheckResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.authorizedSigners = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.recipient = "";
                else {
                    object.recipient = [];
                    if (options.bytes !== Array)
                        object.recipient = $util.newBuffer(object.recipient);
                }
                object.error = null;
            }
            if (message.authorizedSigners && message.authorizedSigners.length) {
                object.authorizedSigners = [];
                for (let j = 0; j < message.authorizedSigners.length; ++j)
                    object.authorizedSigners[j] = options.bytes === String ? $util.base64.encode(message.authorizedSigners[j], 0, message.authorizedSigners[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.authorizedSigners[j]) : message.authorizedSigners[j];
            }
            if (message.recipient != null && Object.hasOwnProperty.call(message, "recipient"))
                object.recipient = options.bytes === String ? $util.base64.encode(message.recipient, 0, message.recipient.length) : options.bytes === Array ? Array.prototype.slice.call(message.recipient) : message.recipient;
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                object.error = $root.types.PluginError.toObject(message.error, options, q + 1);
            return object;
        };

        /**
         * Converts this PluginCheckResponse to JSON.
         * @function toJSON
         * @memberof types.PluginCheckResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginCheckResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginCheckResponse
         * @function getTypeUrl
         * @memberof types.PluginCheckResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginCheckResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginCheckResponse";
        };

        return PluginCheckResponse;
    })();

    types.PluginDeliverRequest = (function() {

        /**
         * Properties of a PluginDeliverRequest.
         * @memberof types
         * @interface IPluginDeliverRequest
         * @property {types.ITransaction|null} [tx] PluginDeliverRequest tx
         */

        /**
         * Constructs a new PluginDeliverRequest.
         * @memberof types
         * @classdesc Represents a PluginDeliverRequest.
         * @implements IPluginDeliverRequest
         * @constructor
         * @param {types.IPluginDeliverRequest=} [properties] Properties to set
         */
        function PluginDeliverRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginDeliverRequest tx.
         * @member {types.ITransaction|null|undefined} tx
         * @memberof types.PluginDeliverRequest
         * @instance
         */
        PluginDeliverRequest.prototype.tx = null;

        /**
         * Creates a new PluginDeliverRequest instance using the specified properties.
         * @function create
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {types.IPluginDeliverRequest=} [properties] Properties to set
         * @returns {types.PluginDeliverRequest} PluginDeliverRequest instance
         */
        PluginDeliverRequest.create = function create(properties) {
            return new PluginDeliverRequest(properties);
        };

        /**
         * Encodes the specified PluginDeliverRequest message. Does not implicitly {@link types.PluginDeliverRequest.verify|verify} messages.
         * @function encode
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {types.IPluginDeliverRequest} message PluginDeliverRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginDeliverRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.tx != null && Object.hasOwnProperty.call(message, "tx"))
                $root.types.Transaction.encode(message.tx, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginDeliverRequest message, length delimited. Does not implicitly {@link types.PluginDeliverRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {types.IPluginDeliverRequest} message PluginDeliverRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginDeliverRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginDeliverRequest message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginDeliverRequest} PluginDeliverRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginDeliverRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginDeliverRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.tx = $root.types.Transaction.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginDeliverRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginDeliverRequest} PluginDeliverRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginDeliverRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginDeliverRequest message.
         * @function verify
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginDeliverRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.tx != null && Object.hasOwnProperty.call(message, "tx")) {
                let error = $root.types.Transaction.verify(message.tx, long + 1);
                if (error)
                    return "tx." + error;
            }
            return null;
        };

        /**
         * Creates a PluginDeliverRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginDeliverRequest} PluginDeliverRequest
         */
        PluginDeliverRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginDeliverRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginDeliverRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginDeliverRequest();
            if (object.tx != null) {
                if (!$util.isObject(object.tx))
                    throw TypeError(".types.PluginDeliverRequest.tx: object expected");
                message.tx = $root.types.Transaction.fromObject(object.tx, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginDeliverRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {types.PluginDeliverRequest} message PluginDeliverRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginDeliverRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.tx = null;
            if (message.tx != null && Object.hasOwnProperty.call(message, "tx"))
                object.tx = $root.types.Transaction.toObject(message.tx, options, q + 1);
            return object;
        };

        /**
         * Converts this PluginDeliverRequest to JSON.
         * @function toJSON
         * @memberof types.PluginDeliverRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginDeliverRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginDeliverRequest
         * @function getTypeUrl
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginDeliverRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginDeliverRequest";
        };

        return PluginDeliverRequest;
    })();

    types.PluginDeliverResponse = (function() {

        /**
         * Properties of a PluginDeliverResponse.
         * @memberof types
         * @interface IPluginDeliverResponse
         * @property {Array.<types.IEvent>|null} [events] PluginDeliverResponse events
         * @property {types.IPluginError|null} [error] PluginDeliverResponse error
         */

        /**
         * Constructs a new PluginDeliverResponse.
         * @memberof types
         * @classdesc Represents a PluginDeliverResponse.
         * @implements IPluginDeliverResponse
         * @constructor
         * @param {types.IPluginDeliverResponse=} [properties] Properties to set
         */
        function PluginDeliverResponse(properties) {
            this.events = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginDeliverResponse events.
         * @member {Array.<types.IEvent>} events
         * @memberof types.PluginDeliverResponse
         * @instance
         */
        PluginDeliverResponse.prototype.events = $util.emptyArray;

        /**
         * PluginDeliverResponse error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.PluginDeliverResponse
         * @instance
         */
        PluginDeliverResponse.prototype.error = null;

        /**
         * Creates a new PluginDeliverResponse instance using the specified properties.
         * @function create
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {types.IPluginDeliverResponse=} [properties] Properties to set
         * @returns {types.PluginDeliverResponse} PluginDeliverResponse instance
         */
        PluginDeliverResponse.create = function create(properties) {
            return new PluginDeliverResponse(properties);
        };

        /**
         * Encodes the specified PluginDeliverResponse message. Does not implicitly {@link types.PluginDeliverResponse.verify|verify} messages.
         * @function encode
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {types.IPluginDeliverResponse} message PluginDeliverResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginDeliverResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.events != null && message.events.length)
                for (let i = 0; i < message.events.length; ++i)
                    $root.types.Event.encode(message.events[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginDeliverResponse message, length delimited. Does not implicitly {@link types.PluginDeliverResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {types.IPluginDeliverResponse} message PluginDeliverResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginDeliverResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginDeliverResponse message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginDeliverResponse} PluginDeliverResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginDeliverResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginDeliverResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.events && message.events.length))
                            message.events = [];
                        message.events.push($root.types.Event.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginDeliverResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginDeliverResponse} PluginDeliverResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginDeliverResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginDeliverResponse message.
         * @function verify
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginDeliverResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.events != null && Object.hasOwnProperty.call(message, "events")) {
                if (!Array.isArray(message.events))
                    return "events: array expected";
                for (let i = 0; i < message.events.length; ++i) {
                    let error = $root.types.Event.verify(message.events[i], long + 1);
                    if (error)
                        return "events." + error;
                }
            }
            if (message.error != null && Object.hasOwnProperty.call(message, "error")) {
                let error = $root.types.PluginError.verify(message.error, long + 1);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a PluginDeliverResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginDeliverResponse} PluginDeliverResponse
         */
        PluginDeliverResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginDeliverResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginDeliverResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginDeliverResponse();
            if (object.events) {
                if (!Array.isArray(object.events))
                    throw TypeError(".types.PluginDeliverResponse.events: array expected");
                message.events = [];
                for (let i = 0; i < object.events.length; ++i) {
                    if (!$util.isObject(object.events[i]))
                        throw TypeError(".types.PluginDeliverResponse.events: object expected");
                    message.events[i] = $root.types.Event.fromObject(object.events[i], long + 1);
                }
            }
            if (object.error != null) {
                if (!$util.isObject(object.error))
                    throw TypeError(".types.PluginDeliverResponse.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginDeliverResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {types.PluginDeliverResponse} message PluginDeliverResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginDeliverResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.events = [];
            if (options.defaults)
                object.error = null;
            if (message.events && message.events.length) {
                object.events = [];
                for (let j = 0; j < message.events.length; ++j)
                    object.events[j] = $root.types.Event.toObject(message.events[j], options, q + 1);
            }
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                object.error = $root.types.PluginError.toObject(message.error, options, q + 1);
            return object;
        };

        /**
         * Converts this PluginDeliverResponse to JSON.
         * @function toJSON
         * @memberof types.PluginDeliverResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginDeliverResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginDeliverResponse
         * @function getTypeUrl
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginDeliverResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginDeliverResponse";
        };

        return PluginDeliverResponse;
    })();

    types.PluginEndRequest = (function() {

        /**
         * Properties of a PluginEndRequest.
         * @memberof types
         * @interface IPluginEndRequest
         * @property {number|Long|null} [height] PluginEndRequest height
         * @property {Uint8Array|null} [proposerAddress] PluginEndRequest proposerAddress
         */

        /**
         * Constructs a new PluginEndRequest.
         * @memberof types
         * @classdesc Represents a PluginEndRequest.
         * @implements IPluginEndRequest
         * @constructor
         * @param {types.IPluginEndRequest=} [properties] Properties to set
         */
        function PluginEndRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginEndRequest height.
         * @member {number|Long} height
         * @memberof types.PluginEndRequest
         * @instance
         */
        PluginEndRequest.prototype.height = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginEndRequest proposerAddress.
         * @member {Uint8Array} proposerAddress
         * @memberof types.PluginEndRequest
         * @instance
         */
        PluginEndRequest.prototype.proposerAddress = $util.newBuffer([]);

        /**
         * Creates a new PluginEndRequest instance using the specified properties.
         * @function create
         * @memberof types.PluginEndRequest
         * @static
         * @param {types.IPluginEndRequest=} [properties] Properties to set
         * @returns {types.PluginEndRequest} PluginEndRequest instance
         */
        PluginEndRequest.create = function create(properties) {
            return new PluginEndRequest(properties);
        };

        /**
         * Encodes the specified PluginEndRequest message. Does not implicitly {@link types.PluginEndRequest.verify|verify} messages.
         * @function encode
         * @memberof types.PluginEndRequest
         * @static
         * @param {types.IPluginEndRequest} message PluginEndRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginEndRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.height);
            if (message.proposerAddress != null && Object.hasOwnProperty.call(message, "proposerAddress"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.proposerAddress);
            return writer;
        };

        /**
         * Encodes the specified PluginEndRequest message, length delimited. Does not implicitly {@link types.PluginEndRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginEndRequest
         * @static
         * @param {types.IPluginEndRequest} message PluginEndRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginEndRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginEndRequest message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginEndRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginEndRequest} PluginEndRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginEndRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginEndRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.height = reader.uint64();
                        break;
                    }
                case 2: {
                        message.proposerAddress = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginEndRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginEndRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginEndRequest} PluginEndRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginEndRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginEndRequest message.
         * @function verify
         * @memberof types.PluginEndRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginEndRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                    return "height: integer|Long expected";
            if (message.proposerAddress != null && Object.hasOwnProperty.call(message, "proposerAddress"))
                if (!(message.proposerAddress && typeof message.proposerAddress.length === "number" || $util.isString(message.proposerAddress)))
                    return "proposerAddress: buffer expected";
            return null;
        };

        /**
         * Creates a PluginEndRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginEndRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginEndRequest} PluginEndRequest
         */
        PluginEndRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginEndRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginEndRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginEndRequest();
            if (object.height != null)
                if ($util.Long)
                    message.height = $util.Long.fromValue(object.height, true);
                else if (typeof object.height === "string")
                    message.height = parseInt(object.height, 10);
                else if (typeof object.height === "number")
                    message.height = object.height;
                else if (typeof object.height === "object")
                    message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber(true);
            if (object.proposerAddress != null)
                if (typeof object.proposerAddress === "string")
                    $util.base64.decode(object.proposerAddress, message.proposerAddress = $util.newBuffer($util.base64.length(object.proposerAddress)), 0);
                else if (object.proposerAddress.length >= 0)
                    message.proposerAddress = object.proposerAddress;
            return message;
        };

        /**
         * Creates a plain object from a PluginEndRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginEndRequest
         * @static
         * @param {types.PluginEndRequest} message PluginEndRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginEndRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.height = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.proposerAddress = "";
                else {
                    object.proposerAddress = [];
                    if (options.bytes !== Array)
                        object.proposerAddress = $util.newBuffer(object.proposerAddress);
                }
            }
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.height = typeof message.height === "number" ? BigInt(message.height) : $util.Long.fromBits(message.height.low >>> 0, message.height.high >>> 0, true).toBigInt();
                else if (typeof message.height === "number")
                    object.height = options.longs === String ? String(message.height) : message.height;
                else
                    object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber(true) : message.height;
            if (message.proposerAddress != null && Object.hasOwnProperty.call(message, "proposerAddress"))
                object.proposerAddress = options.bytes === String ? $util.base64.encode(message.proposerAddress, 0, message.proposerAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.proposerAddress) : message.proposerAddress;
            return object;
        };

        /**
         * Converts this PluginEndRequest to JSON.
         * @function toJSON
         * @memberof types.PluginEndRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginEndRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginEndRequest
         * @function getTypeUrl
         * @memberof types.PluginEndRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginEndRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginEndRequest";
        };

        return PluginEndRequest;
    })();

    types.PluginEndResponse = (function() {

        /**
         * Properties of a PluginEndResponse.
         * @memberof types
         * @interface IPluginEndResponse
         * @property {Array.<types.IEvent>|null} [events] PluginEndResponse events
         * @property {types.IPluginError|null} [error] PluginEndResponse error
         */

        /**
         * Constructs a new PluginEndResponse.
         * @memberof types
         * @classdesc Represents a PluginEndResponse.
         * @implements IPluginEndResponse
         * @constructor
         * @param {types.IPluginEndResponse=} [properties] Properties to set
         */
        function PluginEndResponse(properties) {
            this.events = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginEndResponse events.
         * @member {Array.<types.IEvent>} events
         * @memberof types.PluginEndResponse
         * @instance
         */
        PluginEndResponse.prototype.events = $util.emptyArray;

        /**
         * PluginEndResponse error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.PluginEndResponse
         * @instance
         */
        PluginEndResponse.prototype.error = null;

        /**
         * Creates a new PluginEndResponse instance using the specified properties.
         * @function create
         * @memberof types.PluginEndResponse
         * @static
         * @param {types.IPluginEndResponse=} [properties] Properties to set
         * @returns {types.PluginEndResponse} PluginEndResponse instance
         */
        PluginEndResponse.create = function create(properties) {
            return new PluginEndResponse(properties);
        };

        /**
         * Encodes the specified PluginEndResponse message. Does not implicitly {@link types.PluginEndResponse.verify|verify} messages.
         * @function encode
         * @memberof types.PluginEndResponse
         * @static
         * @param {types.IPluginEndResponse} message PluginEndResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginEndResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.events != null && message.events.length)
                for (let i = 0; i < message.events.length; ++i)
                    $root.types.Event.encode(message.events[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginEndResponse message, length delimited. Does not implicitly {@link types.PluginEndResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginEndResponse
         * @static
         * @param {types.IPluginEndResponse} message PluginEndResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginEndResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginEndResponse message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginEndResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginEndResponse} PluginEndResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginEndResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginEndResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.events && message.events.length))
                            message.events = [];
                        message.events.push($root.types.Event.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginEndResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginEndResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginEndResponse} PluginEndResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginEndResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginEndResponse message.
         * @function verify
         * @memberof types.PluginEndResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginEndResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.events != null && Object.hasOwnProperty.call(message, "events")) {
                if (!Array.isArray(message.events))
                    return "events: array expected";
                for (let i = 0; i < message.events.length; ++i) {
                    let error = $root.types.Event.verify(message.events[i], long + 1);
                    if (error)
                        return "events." + error;
                }
            }
            if (message.error != null && Object.hasOwnProperty.call(message, "error")) {
                let error = $root.types.PluginError.verify(message.error, long + 1);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a PluginEndResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginEndResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginEndResponse} PluginEndResponse
         */
        PluginEndResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginEndResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginEndResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginEndResponse();
            if (object.events) {
                if (!Array.isArray(object.events))
                    throw TypeError(".types.PluginEndResponse.events: array expected");
                message.events = [];
                for (let i = 0; i < object.events.length; ++i) {
                    if (!$util.isObject(object.events[i]))
                        throw TypeError(".types.PluginEndResponse.events: object expected");
                    message.events[i] = $root.types.Event.fromObject(object.events[i], long + 1);
                }
            }
            if (object.error != null) {
                if (!$util.isObject(object.error))
                    throw TypeError(".types.PluginEndResponse.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginEndResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginEndResponse
         * @static
         * @param {types.PluginEndResponse} message PluginEndResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginEndResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.events = [];
            if (options.defaults)
                object.error = null;
            if (message.events && message.events.length) {
                object.events = [];
                for (let j = 0; j < message.events.length; ++j)
                    object.events[j] = $root.types.Event.toObject(message.events[j], options, q + 1);
            }
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                object.error = $root.types.PluginError.toObject(message.error, options, q + 1);
            return object;
        };

        /**
         * Converts this PluginEndResponse to JSON.
         * @function toJSON
         * @memberof types.PluginEndResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginEndResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginEndResponse
         * @function getTypeUrl
         * @memberof types.PluginEndResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginEndResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginEndResponse";
        };

        return PluginEndResponse;
    })();

    types.PluginError = (function() {

        /**
         * Properties of a PluginError.
         * @memberof types
         * @interface IPluginError
         * @property {number|Long|null} [code] PluginError code
         * @property {string|null} [module] PluginError module
         * @property {string|null} [msg] PluginError msg
         */

        /**
         * Constructs a new PluginError.
         * @memberof types
         * @classdesc Represents a PluginError.
         * @implements IPluginError
         * @constructor
         * @param {types.IPluginError=} [properties] Properties to set
         */
        function PluginError(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginError code.
         * @member {number|Long} code
         * @memberof types.PluginError
         * @instance
         */
        PluginError.prototype.code = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginError module.
         * @member {string} module
         * @memberof types.PluginError
         * @instance
         */
        PluginError.prototype.module = "";

        /**
         * PluginError msg.
         * @member {string} msg
         * @memberof types.PluginError
         * @instance
         */
        PluginError.prototype.msg = "";

        /**
         * Creates a new PluginError instance using the specified properties.
         * @function create
         * @memberof types.PluginError
         * @static
         * @param {types.IPluginError=} [properties] Properties to set
         * @returns {types.PluginError} PluginError instance
         */
        PluginError.create = function create(properties) {
            return new PluginError(properties);
        };

        /**
         * Encodes the specified PluginError message. Does not implicitly {@link types.PluginError.verify|verify} messages.
         * @function encode
         * @memberof types.PluginError
         * @static
         * @param {types.IPluginError} message PluginError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginError.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.code);
            if (message.module != null && Object.hasOwnProperty.call(message, "module"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.module);
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.msg);
            return writer;
        };

        /**
         * Encodes the specified PluginError message, length delimited. Does not implicitly {@link types.PluginError.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginError
         * @static
         * @param {types.IPluginError} message PluginError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginError.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginError message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginError} PluginError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginError.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginError();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.code = reader.uint64();
                        break;
                    }
                case 2: {
                        message.module = reader.string();
                        break;
                    }
                case 3: {
                        message.msg = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginError message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginError} PluginError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginError.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginError message.
         * @function verify
         * @memberof types.PluginError
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginError.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                if (!$util.isInteger(message.code) && !(message.code && $util.isInteger(message.code.low) && $util.isInteger(message.code.high)))
                    return "code: integer|Long expected";
            if (message.module != null && Object.hasOwnProperty.call(message, "module"))
                if (!$util.isString(message.module))
                    return "module: string expected";
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            return null;
        };

        /**
         * Creates a PluginError message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginError
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginError} PluginError
         */
        PluginError.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginError)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginError: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginError();
            if (object.code != null)
                if ($util.Long)
                    message.code = $util.Long.fromValue(object.code, true);
                else if (typeof object.code === "string")
                    message.code = parseInt(object.code, 10);
                else if (typeof object.code === "number")
                    message.code = object.code;
                else if (typeof object.code === "object")
                    message.code = new $util.LongBits(object.code.low >>> 0, object.code.high >>> 0).toNumber(true);
            if (object.module != null)
                message.module = String(object.module);
            if (object.msg != null)
                message.msg = String(object.msg);
            return message;
        };

        /**
         * Creates a plain object from a PluginError message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginError
         * @static
         * @param {types.PluginError} message PluginError
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginError.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.code = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.code = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.module = "";
                object.msg = "";
            }
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.code = typeof message.code === "number" ? BigInt(message.code) : $util.Long.fromBits(message.code.low >>> 0, message.code.high >>> 0, true).toBigInt();
                else if (typeof message.code === "number")
                    object.code = options.longs === String ? String(message.code) : message.code;
                else
                    object.code = options.longs === String ? $util.Long.prototype.toString.call(message.code) : options.longs === Number ? new $util.LongBits(message.code.low >>> 0, message.code.high >>> 0).toNumber(true) : message.code;
            if (message.module != null && Object.hasOwnProperty.call(message, "module"))
                object.module = message.module;
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                object.msg = message.msg;
            return object;
        };

        /**
         * Converts this PluginError to JSON.
         * @function toJSON
         * @memberof types.PluginError
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginError.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginError
         * @function getTypeUrl
         * @memberof types.PluginError
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginError.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginError";
        };

        return PluginError;
    })();

    types.PluginQueryRequest = (function() {

        /**
         * Properties of a PluginQueryRequest.
         * @memberof types
         * @interface IPluginQueryRequest
         * @property {number|Long|null} [height] PluginQueryRequest height
         * @property {types.IPluginStateReadRequest|null} [read] PluginQueryRequest read
         */

        /**
         * Constructs a new PluginQueryRequest.
         * @memberof types
         * @classdesc Represents a PluginQueryRequest.
         * @implements IPluginQueryRequest
         * @constructor
         * @param {types.IPluginQueryRequest=} [properties] Properties to set
         */
        function PluginQueryRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginQueryRequest height.
         * @member {number|Long} height
         * @memberof types.PluginQueryRequest
         * @instance
         */
        PluginQueryRequest.prototype.height = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginQueryRequest read.
         * @member {types.IPluginStateReadRequest|null|undefined} read
         * @memberof types.PluginQueryRequest
         * @instance
         */
        PluginQueryRequest.prototype.read = null;

        /**
         * Creates a new PluginQueryRequest instance using the specified properties.
         * @function create
         * @memberof types.PluginQueryRequest
         * @static
         * @param {types.IPluginQueryRequest=} [properties] Properties to set
         * @returns {types.PluginQueryRequest} PluginQueryRequest instance
         */
        PluginQueryRequest.create = function create(properties) {
            return new PluginQueryRequest(properties);
        };

        /**
         * Encodes the specified PluginQueryRequest message. Does not implicitly {@link types.PluginQueryRequest.verify|verify} messages.
         * @function encode
         * @memberof types.PluginQueryRequest
         * @static
         * @param {types.IPluginQueryRequest} message PluginQueryRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginQueryRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.height);
            if (message.read != null && Object.hasOwnProperty.call(message, "read"))
                $root.types.PluginStateReadRequest.encode(message.read, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginQueryRequest message, length delimited. Does not implicitly {@link types.PluginQueryRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginQueryRequest
         * @static
         * @param {types.IPluginQueryRequest} message PluginQueryRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginQueryRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginQueryRequest message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginQueryRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginQueryRequest} PluginQueryRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginQueryRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginQueryRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.height = reader.uint64();
                        break;
                    }
                case 2: {
                        message.read = $root.types.PluginStateReadRequest.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginQueryRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginQueryRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginQueryRequest} PluginQueryRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginQueryRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginQueryRequest message.
         * @function verify
         * @memberof types.PluginQueryRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginQueryRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                    return "height: integer|Long expected";
            if (message.read != null && Object.hasOwnProperty.call(message, "read")) {
                let error = $root.types.PluginStateReadRequest.verify(message.read, long + 1);
                if (error)
                    return "read." + error;
            }
            return null;
        };

        /**
         * Creates a PluginQueryRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginQueryRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginQueryRequest} PluginQueryRequest
         */
        PluginQueryRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginQueryRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginQueryRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginQueryRequest();
            if (object.height != null)
                if ($util.Long)
                    message.height = $util.Long.fromValue(object.height, true);
                else if (typeof object.height === "string")
                    message.height = parseInt(object.height, 10);
                else if (typeof object.height === "number")
                    message.height = object.height;
                else if (typeof object.height === "object")
                    message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber(true);
            if (object.read != null) {
                if (!$util.isObject(object.read))
                    throw TypeError(".types.PluginQueryRequest.read: object expected");
                message.read = $root.types.PluginStateReadRequest.fromObject(object.read, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginQueryRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginQueryRequest
         * @static
         * @param {types.PluginQueryRequest} message PluginQueryRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginQueryRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.height = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.read = null;
            }
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.height = typeof message.height === "number" ? BigInt(message.height) : $util.Long.fromBits(message.height.low >>> 0, message.height.high >>> 0, true).toBigInt();
                else if (typeof message.height === "number")
                    object.height = options.longs === String ? String(message.height) : message.height;
                else
                    object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber(true) : message.height;
            if (message.read != null && Object.hasOwnProperty.call(message, "read"))
                object.read = $root.types.PluginStateReadRequest.toObject(message.read, options, q + 1);
            return object;
        };

        /**
         * Converts this PluginQueryRequest to JSON.
         * @function toJSON
         * @memberof types.PluginQueryRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginQueryRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginQueryRequest
         * @function getTypeUrl
         * @memberof types.PluginQueryRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginQueryRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginQueryRequest";
        };

        return PluginQueryRequest;
    })();

    types.PluginQueryResponse = (function() {

        /**
         * Properties of a PluginQueryResponse.
         * @memberof types
         * @interface IPluginQueryResponse
         * @property {types.IPluginStateReadResponse|null} [read] PluginQueryResponse read
         * @property {types.IPluginError|null} [error] PluginQueryResponse error
         */

        /**
         * Constructs a new PluginQueryResponse.
         * @memberof types
         * @classdesc Represents a PluginQueryResponse.
         * @implements IPluginQueryResponse
         * @constructor
         * @param {types.IPluginQueryResponse=} [properties] Properties to set
         */
        function PluginQueryResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginQueryResponse read.
         * @member {types.IPluginStateReadResponse|null|undefined} read
         * @memberof types.PluginQueryResponse
         * @instance
         */
        PluginQueryResponse.prototype.read = null;

        /**
         * PluginQueryResponse error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.PluginQueryResponse
         * @instance
         */
        PluginQueryResponse.prototype.error = null;

        /**
         * Creates a new PluginQueryResponse instance using the specified properties.
         * @function create
         * @memberof types.PluginQueryResponse
         * @static
         * @param {types.IPluginQueryResponse=} [properties] Properties to set
         * @returns {types.PluginQueryResponse} PluginQueryResponse instance
         */
        PluginQueryResponse.create = function create(properties) {
            return new PluginQueryResponse(properties);
        };

        /**
         * Encodes the specified PluginQueryResponse message. Does not implicitly {@link types.PluginQueryResponse.verify|verify} messages.
         * @function encode
         * @memberof types.PluginQueryResponse
         * @static
         * @param {types.IPluginQueryResponse} message PluginQueryResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginQueryResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.read != null && Object.hasOwnProperty.call(message, "read"))
                $root.types.PluginStateReadResponse.encode(message.read, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginQueryResponse message, length delimited. Does not implicitly {@link types.PluginQueryResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginQueryResponse
         * @static
         * @param {types.IPluginQueryResponse} message PluginQueryResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginQueryResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginQueryResponse message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginQueryResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginQueryResponse} PluginQueryResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginQueryResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginQueryResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.read = $root.types.PluginStateReadResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginQueryResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginQueryResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginQueryResponse} PluginQueryResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginQueryResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginQueryResponse message.
         * @function verify
         * @memberof types.PluginQueryResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginQueryResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.read != null && Object.hasOwnProperty.call(message, "read")) {
                let error = $root.types.PluginStateReadResponse.verify(message.read, long + 1);
                if (error)
                    return "read." + error;
            }
            if (message.error != null && Object.hasOwnProperty.call(message, "error")) {
                let error = $root.types.PluginError.verify(message.error, long + 1);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a PluginQueryResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginQueryResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginQueryResponse} PluginQueryResponse
         */
        PluginQueryResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginQueryResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginQueryResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginQueryResponse();
            if (object.read != null) {
                if (!$util.isObject(object.read))
                    throw TypeError(".types.PluginQueryResponse.read: object expected");
                message.read = $root.types.PluginStateReadResponse.fromObject(object.read, long + 1);
            }
            if (object.error != null) {
                if (!$util.isObject(object.error))
                    throw TypeError(".types.PluginQueryResponse.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginQueryResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginQueryResponse
         * @static
         * @param {types.PluginQueryResponse} message PluginQueryResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginQueryResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.read = null;
                object.error = null;
            }
            if (message.read != null && Object.hasOwnProperty.call(message, "read"))
                object.read = $root.types.PluginStateReadResponse.toObject(message.read, options, q + 1);
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                object.error = $root.types.PluginError.toObject(message.error, options, q + 1);
            return object;
        };

        /**
         * Converts this PluginQueryResponse to JSON.
         * @function toJSON
         * @memberof types.PluginQueryResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginQueryResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginQueryResponse
         * @function getTypeUrl
         * @memberof types.PluginQueryResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginQueryResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginQueryResponse";
        };

        return PluginQueryResponse;
    })();

    types.PluginStateReadRequest = (function() {

        /**
         * Properties of a PluginStateReadRequest.
         * @memberof types
         * @interface IPluginStateReadRequest
         * @property {Array.<types.IPluginKeyRead>|null} [keys] PluginStateReadRequest keys
         * @property {Array.<types.IPluginRangeRead>|null} [ranges] PluginStateReadRequest ranges
         */

        /**
         * Constructs a new PluginStateReadRequest.
         * @memberof types
         * @classdesc Represents a PluginStateReadRequest.
         * @implements IPluginStateReadRequest
         * @constructor
         * @param {types.IPluginStateReadRequest=} [properties] Properties to set
         */
        function PluginStateReadRequest(properties) {
            this.keys = [];
            this.ranges = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginStateReadRequest keys.
         * @member {Array.<types.IPluginKeyRead>} keys
         * @memberof types.PluginStateReadRequest
         * @instance
         */
        PluginStateReadRequest.prototype.keys = $util.emptyArray;

        /**
         * PluginStateReadRequest ranges.
         * @member {Array.<types.IPluginRangeRead>} ranges
         * @memberof types.PluginStateReadRequest
         * @instance
         */
        PluginStateReadRequest.prototype.ranges = $util.emptyArray;

        /**
         * Creates a new PluginStateReadRequest instance using the specified properties.
         * @function create
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {types.IPluginStateReadRequest=} [properties] Properties to set
         * @returns {types.PluginStateReadRequest} PluginStateReadRequest instance
         */
        PluginStateReadRequest.create = function create(properties) {
            return new PluginStateReadRequest(properties);
        };

        /**
         * Encodes the specified PluginStateReadRequest message. Does not implicitly {@link types.PluginStateReadRequest.verify|verify} messages.
         * @function encode
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {types.IPluginStateReadRequest} message PluginStateReadRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateReadRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.keys != null && message.keys.length)
                for (let i = 0; i < message.keys.length; ++i)
                    $root.types.PluginKeyRead.encode(message.keys[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.ranges != null && message.ranges.length)
                for (let i = 0; i < message.ranges.length; ++i)
                    $root.types.PluginRangeRead.encode(message.ranges[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginStateReadRequest message, length delimited. Does not implicitly {@link types.PluginStateReadRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {types.IPluginStateReadRequest} message PluginStateReadRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateReadRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginStateReadRequest message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginStateReadRequest} PluginStateReadRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateReadRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginStateReadRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.keys && message.keys.length))
                            message.keys = [];
                        message.keys.push($root.types.PluginKeyRead.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        if (!(message.ranges && message.ranges.length))
                            message.ranges = [];
                        message.ranges.push($root.types.PluginRangeRead.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginStateReadRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginStateReadRequest} PluginStateReadRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateReadRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginStateReadRequest message.
         * @function verify
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginStateReadRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.keys != null && Object.hasOwnProperty.call(message, "keys")) {
                if (!Array.isArray(message.keys))
                    return "keys: array expected";
                for (let i = 0; i < message.keys.length; ++i) {
                    let error = $root.types.PluginKeyRead.verify(message.keys[i], long + 1);
                    if (error)
                        return "keys." + error;
                }
            }
            if (message.ranges != null && Object.hasOwnProperty.call(message, "ranges")) {
                if (!Array.isArray(message.ranges))
                    return "ranges: array expected";
                for (let i = 0; i < message.ranges.length; ++i) {
                    let error = $root.types.PluginRangeRead.verify(message.ranges[i], long + 1);
                    if (error)
                        return "ranges." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PluginStateReadRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginStateReadRequest} PluginStateReadRequest
         */
        PluginStateReadRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginStateReadRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginStateReadRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginStateReadRequest();
            if (object.keys) {
                if (!Array.isArray(object.keys))
                    throw TypeError(".types.PluginStateReadRequest.keys: array expected");
                message.keys = [];
                for (let i = 0; i < object.keys.length; ++i) {
                    if (!$util.isObject(object.keys[i]))
                        throw TypeError(".types.PluginStateReadRequest.keys: object expected");
                    message.keys[i] = $root.types.PluginKeyRead.fromObject(object.keys[i], long + 1);
                }
            }
            if (object.ranges) {
                if (!Array.isArray(object.ranges))
                    throw TypeError(".types.PluginStateReadRequest.ranges: array expected");
                message.ranges = [];
                for (let i = 0; i < object.ranges.length; ++i) {
                    if (!$util.isObject(object.ranges[i]))
                        throw TypeError(".types.PluginStateReadRequest.ranges: object expected");
                    message.ranges[i] = $root.types.PluginRangeRead.fromObject(object.ranges[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginStateReadRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {types.PluginStateReadRequest} message PluginStateReadRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginStateReadRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.keys = [];
                object.ranges = [];
            }
            if (message.keys && message.keys.length) {
                object.keys = [];
                for (let j = 0; j < message.keys.length; ++j)
                    object.keys[j] = $root.types.PluginKeyRead.toObject(message.keys[j], options, q + 1);
            }
            if (message.ranges && message.ranges.length) {
                object.ranges = [];
                for (let j = 0; j < message.ranges.length; ++j)
                    object.ranges[j] = $root.types.PluginRangeRead.toObject(message.ranges[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this PluginStateReadRequest to JSON.
         * @function toJSON
         * @memberof types.PluginStateReadRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginStateReadRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginStateReadRequest
         * @function getTypeUrl
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginStateReadRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginStateReadRequest";
        };

        return PluginStateReadRequest;
    })();

    types.PluginKeyRead = (function() {

        /**
         * Properties of a PluginKeyRead.
         * @memberof types
         * @interface IPluginKeyRead
         * @property {number|Long|null} [queryId] PluginKeyRead queryId
         * @property {Uint8Array|null} [key] PluginKeyRead key
         */

        /**
         * Constructs a new PluginKeyRead.
         * @memberof types
         * @classdesc Represents a PluginKeyRead.
         * @implements IPluginKeyRead
         * @constructor
         * @param {types.IPluginKeyRead=} [properties] Properties to set
         */
        function PluginKeyRead(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginKeyRead queryId.
         * @member {number|Long} queryId
         * @memberof types.PluginKeyRead
         * @instance
         */
        PluginKeyRead.prototype.queryId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginKeyRead key.
         * @member {Uint8Array} key
         * @memberof types.PluginKeyRead
         * @instance
         */
        PluginKeyRead.prototype.key = $util.newBuffer([]);

        /**
         * Creates a new PluginKeyRead instance using the specified properties.
         * @function create
         * @memberof types.PluginKeyRead
         * @static
         * @param {types.IPluginKeyRead=} [properties] Properties to set
         * @returns {types.PluginKeyRead} PluginKeyRead instance
         */
        PluginKeyRead.create = function create(properties) {
            return new PluginKeyRead(properties);
        };

        /**
         * Encodes the specified PluginKeyRead message. Does not implicitly {@link types.PluginKeyRead.verify|verify} messages.
         * @function encode
         * @memberof types.PluginKeyRead
         * @static
         * @param {types.IPluginKeyRead} message PluginKeyRead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginKeyRead.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.queryId != null && Object.hasOwnProperty.call(message, "queryId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.queryId);
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.key);
            return writer;
        };

        /**
         * Encodes the specified PluginKeyRead message, length delimited. Does not implicitly {@link types.PluginKeyRead.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginKeyRead
         * @static
         * @param {types.IPluginKeyRead} message PluginKeyRead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginKeyRead.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginKeyRead message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginKeyRead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginKeyRead} PluginKeyRead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginKeyRead.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginKeyRead();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.queryId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.key = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginKeyRead message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginKeyRead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginKeyRead} PluginKeyRead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginKeyRead.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginKeyRead message.
         * @function verify
         * @memberof types.PluginKeyRead
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginKeyRead.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.queryId != null && Object.hasOwnProperty.call(message, "queryId"))
                if (!$util.isInteger(message.queryId) && !(message.queryId && $util.isInteger(message.queryId.low) && $util.isInteger(message.queryId.high)))
                    return "queryId: integer|Long expected";
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            return null;
        };

        /**
         * Creates a PluginKeyRead message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginKeyRead
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginKeyRead} PluginKeyRead
         */
        PluginKeyRead.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginKeyRead)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginKeyRead: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginKeyRead();
            if (object.queryId != null)
                if ($util.Long)
                    message.queryId = $util.Long.fromValue(object.queryId, true);
                else if (typeof object.queryId === "string")
                    message.queryId = parseInt(object.queryId, 10);
                else if (typeof object.queryId === "number")
                    message.queryId = object.queryId;
                else if (typeof object.queryId === "object")
                    message.queryId = new $util.LongBits(object.queryId.low >>> 0, object.queryId.high >>> 0).toNumber(true);
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length >= 0)
                    message.key = object.key;
            return message;
        };

        /**
         * Creates a plain object from a PluginKeyRead message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginKeyRead
         * @static
         * @param {types.PluginKeyRead} message PluginKeyRead
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginKeyRead.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.queryId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.queryId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
            }
            if (message.queryId != null && Object.hasOwnProperty.call(message, "queryId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.queryId = typeof message.queryId === "number" ? BigInt(message.queryId) : $util.Long.fromBits(message.queryId.low >>> 0, message.queryId.high >>> 0, true).toBigInt();
                else if (typeof message.queryId === "number")
                    object.queryId = options.longs === String ? String(message.queryId) : message.queryId;
                else
                    object.queryId = options.longs === String ? $util.Long.prototype.toString.call(message.queryId) : options.longs === Number ? new $util.LongBits(message.queryId.low >>> 0, message.queryId.high >>> 0).toNumber(true) : message.queryId;
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            return object;
        };

        /**
         * Converts this PluginKeyRead to JSON.
         * @function toJSON
         * @memberof types.PluginKeyRead
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginKeyRead.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginKeyRead
         * @function getTypeUrl
         * @memberof types.PluginKeyRead
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginKeyRead.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginKeyRead";
        };

        return PluginKeyRead;
    })();

    types.PluginRangeRead = (function() {

        /**
         * Properties of a PluginRangeRead.
         * @memberof types
         * @interface IPluginRangeRead
         * @property {number|Long|null} [queryId] PluginRangeRead queryId
         * @property {Uint8Array|null} [prefix] PluginRangeRead prefix
         * @property {number|Long|null} [limit] PluginRangeRead limit
         * @property {boolean|null} [reverse] PluginRangeRead reverse
         */

        /**
         * Constructs a new PluginRangeRead.
         * @memberof types
         * @classdesc Represents a PluginRangeRead.
         * @implements IPluginRangeRead
         * @constructor
         * @param {types.IPluginRangeRead=} [properties] Properties to set
         */
        function PluginRangeRead(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginRangeRead queryId.
         * @member {number|Long} queryId
         * @memberof types.PluginRangeRead
         * @instance
         */
        PluginRangeRead.prototype.queryId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginRangeRead prefix.
         * @member {Uint8Array} prefix
         * @memberof types.PluginRangeRead
         * @instance
         */
        PluginRangeRead.prototype.prefix = $util.newBuffer([]);

        /**
         * PluginRangeRead limit.
         * @member {number|Long} limit
         * @memberof types.PluginRangeRead
         * @instance
         */
        PluginRangeRead.prototype.limit = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginRangeRead reverse.
         * @member {boolean} reverse
         * @memberof types.PluginRangeRead
         * @instance
         */
        PluginRangeRead.prototype.reverse = false;

        /**
         * Creates a new PluginRangeRead instance using the specified properties.
         * @function create
         * @memberof types.PluginRangeRead
         * @static
         * @param {types.IPluginRangeRead=} [properties] Properties to set
         * @returns {types.PluginRangeRead} PluginRangeRead instance
         */
        PluginRangeRead.create = function create(properties) {
            return new PluginRangeRead(properties);
        };

        /**
         * Encodes the specified PluginRangeRead message. Does not implicitly {@link types.PluginRangeRead.verify|verify} messages.
         * @function encode
         * @memberof types.PluginRangeRead
         * @static
         * @param {types.IPluginRangeRead} message PluginRangeRead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginRangeRead.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.queryId != null && Object.hasOwnProperty.call(message, "queryId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.queryId);
            if (message.prefix != null && Object.hasOwnProperty.call(message, "prefix"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.prefix);
            if (message.limit != null && Object.hasOwnProperty.call(message, "limit"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.limit);
            if (message.reverse != null && Object.hasOwnProperty.call(message, "reverse"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.reverse);
            return writer;
        };

        /**
         * Encodes the specified PluginRangeRead message, length delimited. Does not implicitly {@link types.PluginRangeRead.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginRangeRead
         * @static
         * @param {types.IPluginRangeRead} message PluginRangeRead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginRangeRead.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginRangeRead message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginRangeRead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginRangeRead} PluginRangeRead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginRangeRead.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginRangeRead();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.queryId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.prefix = reader.bytes();
                        break;
                    }
                case 3: {
                        message.limit = reader.uint64();
                        break;
                    }
                case 4: {
                        message.reverse = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginRangeRead message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginRangeRead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginRangeRead} PluginRangeRead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginRangeRead.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginRangeRead message.
         * @function verify
         * @memberof types.PluginRangeRead
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginRangeRead.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.queryId != null && Object.hasOwnProperty.call(message, "queryId"))
                if (!$util.isInteger(message.queryId) && !(message.queryId && $util.isInteger(message.queryId.low) && $util.isInteger(message.queryId.high)))
                    return "queryId: integer|Long expected";
            if (message.prefix != null && Object.hasOwnProperty.call(message, "prefix"))
                if (!(message.prefix && typeof message.prefix.length === "number" || $util.isString(message.prefix)))
                    return "prefix: buffer expected";
            if (message.limit != null && Object.hasOwnProperty.call(message, "limit"))
                if (!$util.isInteger(message.limit) && !(message.limit && $util.isInteger(message.limit.low) && $util.isInteger(message.limit.high)))
                    return "limit: integer|Long expected";
            if (message.reverse != null && Object.hasOwnProperty.call(message, "reverse"))
                if (typeof message.reverse !== "boolean")
                    return "reverse: boolean expected";
            return null;
        };

        /**
         * Creates a PluginRangeRead message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginRangeRead
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginRangeRead} PluginRangeRead
         */
        PluginRangeRead.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginRangeRead)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginRangeRead: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginRangeRead();
            if (object.queryId != null)
                if ($util.Long)
                    message.queryId = $util.Long.fromValue(object.queryId, true);
                else if (typeof object.queryId === "string")
                    message.queryId = parseInt(object.queryId, 10);
                else if (typeof object.queryId === "number")
                    message.queryId = object.queryId;
                else if (typeof object.queryId === "object")
                    message.queryId = new $util.LongBits(object.queryId.low >>> 0, object.queryId.high >>> 0).toNumber(true);
            if (object.prefix != null)
                if (typeof object.prefix === "string")
                    $util.base64.decode(object.prefix, message.prefix = $util.newBuffer($util.base64.length(object.prefix)), 0);
                else if (object.prefix.length >= 0)
                    message.prefix = object.prefix;
            if (object.limit != null)
                if ($util.Long)
                    message.limit = $util.Long.fromValue(object.limit, true);
                else if (typeof object.limit === "string")
                    message.limit = parseInt(object.limit, 10);
                else if (typeof object.limit === "number")
                    message.limit = object.limit;
                else if (typeof object.limit === "object")
                    message.limit = new $util.LongBits(object.limit.low >>> 0, object.limit.high >>> 0).toNumber(true);
            if (object.reverse != null)
                message.reverse = Boolean(object.reverse);
            return message;
        };

        /**
         * Creates a plain object from a PluginRangeRead message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginRangeRead
         * @static
         * @param {types.PluginRangeRead} message PluginRangeRead
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginRangeRead.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.queryId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.queryId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.prefix = "";
                else {
                    object.prefix = [];
                    if (options.bytes !== Array)
                        object.prefix = $util.newBuffer(object.prefix);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.limit = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.limit = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.reverse = false;
            }
            if (message.queryId != null && Object.hasOwnProperty.call(message, "queryId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.queryId = typeof message.queryId === "number" ? BigInt(message.queryId) : $util.Long.fromBits(message.queryId.low >>> 0, message.queryId.high >>> 0, true).toBigInt();
                else if (typeof message.queryId === "number")
                    object.queryId = options.longs === String ? String(message.queryId) : message.queryId;
                else
                    object.queryId = options.longs === String ? $util.Long.prototype.toString.call(message.queryId) : options.longs === Number ? new $util.LongBits(message.queryId.low >>> 0, message.queryId.high >>> 0).toNumber(true) : message.queryId;
            if (message.prefix != null && Object.hasOwnProperty.call(message, "prefix"))
                object.prefix = options.bytes === String ? $util.base64.encode(message.prefix, 0, message.prefix.length) : options.bytes === Array ? Array.prototype.slice.call(message.prefix) : message.prefix;
            if (message.limit != null && Object.hasOwnProperty.call(message, "limit"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.limit = typeof message.limit === "number" ? BigInt(message.limit) : $util.Long.fromBits(message.limit.low >>> 0, message.limit.high >>> 0, true).toBigInt();
                else if (typeof message.limit === "number")
                    object.limit = options.longs === String ? String(message.limit) : message.limit;
                else
                    object.limit = options.longs === String ? $util.Long.prototype.toString.call(message.limit) : options.longs === Number ? new $util.LongBits(message.limit.low >>> 0, message.limit.high >>> 0).toNumber(true) : message.limit;
            if (message.reverse != null && Object.hasOwnProperty.call(message, "reverse"))
                object.reverse = message.reverse;
            return object;
        };

        /**
         * Converts this PluginRangeRead to JSON.
         * @function toJSON
         * @memberof types.PluginRangeRead
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginRangeRead.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginRangeRead
         * @function getTypeUrl
         * @memberof types.PluginRangeRead
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginRangeRead.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginRangeRead";
        };

        return PluginRangeRead;
    })();

    types.PluginStateReadResponse = (function() {

        /**
         * Properties of a PluginStateReadResponse.
         * @memberof types
         * @interface IPluginStateReadResponse
         * @property {Array.<types.IPluginReadResult>|null} [results] PluginStateReadResponse results
         * @property {types.IPluginError|null} [error] PluginStateReadResponse error
         */

        /**
         * Constructs a new PluginStateReadResponse.
         * @memberof types
         * @classdesc Represents a PluginStateReadResponse.
         * @implements IPluginStateReadResponse
         * @constructor
         * @param {types.IPluginStateReadResponse=} [properties] Properties to set
         */
        function PluginStateReadResponse(properties) {
            this.results = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginStateReadResponse results.
         * @member {Array.<types.IPluginReadResult>} results
         * @memberof types.PluginStateReadResponse
         * @instance
         */
        PluginStateReadResponse.prototype.results = $util.emptyArray;

        /**
         * PluginStateReadResponse error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.PluginStateReadResponse
         * @instance
         */
        PluginStateReadResponse.prototype.error = null;

        /**
         * Creates a new PluginStateReadResponse instance using the specified properties.
         * @function create
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {types.IPluginStateReadResponse=} [properties] Properties to set
         * @returns {types.PluginStateReadResponse} PluginStateReadResponse instance
         */
        PluginStateReadResponse.create = function create(properties) {
            return new PluginStateReadResponse(properties);
        };

        /**
         * Encodes the specified PluginStateReadResponse message. Does not implicitly {@link types.PluginStateReadResponse.verify|verify} messages.
         * @function encode
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {types.IPluginStateReadResponse} message PluginStateReadResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateReadResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.results != null && message.results.length)
                for (let i = 0; i < message.results.length; ++i)
                    $root.types.PluginReadResult.encode(message.results[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginStateReadResponse message, length delimited. Does not implicitly {@link types.PluginStateReadResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {types.IPluginStateReadResponse} message PluginStateReadResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateReadResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginStateReadResponse message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginStateReadResponse} PluginStateReadResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateReadResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginStateReadResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.results && message.results.length))
                            message.results = [];
                        message.results.push($root.types.PluginReadResult.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginStateReadResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginStateReadResponse} PluginStateReadResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateReadResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginStateReadResponse message.
         * @function verify
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginStateReadResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.results != null && Object.hasOwnProperty.call(message, "results")) {
                if (!Array.isArray(message.results))
                    return "results: array expected";
                for (let i = 0; i < message.results.length; ++i) {
                    let error = $root.types.PluginReadResult.verify(message.results[i], long + 1);
                    if (error)
                        return "results." + error;
                }
            }
            if (message.error != null && Object.hasOwnProperty.call(message, "error")) {
                let error = $root.types.PluginError.verify(message.error, long + 1);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a PluginStateReadResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginStateReadResponse} PluginStateReadResponse
         */
        PluginStateReadResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginStateReadResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginStateReadResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginStateReadResponse();
            if (object.results) {
                if (!Array.isArray(object.results))
                    throw TypeError(".types.PluginStateReadResponse.results: array expected");
                message.results = [];
                for (let i = 0; i < object.results.length; ++i) {
                    if (!$util.isObject(object.results[i]))
                        throw TypeError(".types.PluginStateReadResponse.results: object expected");
                    message.results[i] = $root.types.PluginReadResult.fromObject(object.results[i], long + 1);
                }
            }
            if (object.error != null) {
                if (!$util.isObject(object.error))
                    throw TypeError(".types.PluginStateReadResponse.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginStateReadResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {types.PluginStateReadResponse} message PluginStateReadResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginStateReadResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.results = [];
            if (options.defaults)
                object.error = null;
            if (message.results && message.results.length) {
                object.results = [];
                for (let j = 0; j < message.results.length; ++j)
                    object.results[j] = $root.types.PluginReadResult.toObject(message.results[j], options, q + 1);
            }
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                object.error = $root.types.PluginError.toObject(message.error, options, q + 1);
            return object;
        };

        /**
         * Converts this PluginStateReadResponse to JSON.
         * @function toJSON
         * @memberof types.PluginStateReadResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginStateReadResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginStateReadResponse
         * @function getTypeUrl
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginStateReadResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginStateReadResponse";
        };

        return PluginStateReadResponse;
    })();

    types.PluginReadResult = (function() {

        /**
         * Properties of a PluginReadResult.
         * @memberof types
         * @interface IPluginReadResult
         * @property {number|Long|null} [queryId] PluginReadResult queryId
         * @property {Array.<types.IPluginStateEntry>|null} [entries] PluginReadResult entries
         */

        /**
         * Constructs a new PluginReadResult.
         * @memberof types
         * @classdesc Represents a PluginReadResult.
         * @implements IPluginReadResult
         * @constructor
         * @param {types.IPluginReadResult=} [properties] Properties to set
         */
        function PluginReadResult(properties) {
            this.entries = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginReadResult queryId.
         * @member {number|Long} queryId
         * @memberof types.PluginReadResult
         * @instance
         */
        PluginReadResult.prototype.queryId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginReadResult entries.
         * @member {Array.<types.IPluginStateEntry>} entries
         * @memberof types.PluginReadResult
         * @instance
         */
        PluginReadResult.prototype.entries = $util.emptyArray;

        /**
         * Creates a new PluginReadResult instance using the specified properties.
         * @function create
         * @memberof types.PluginReadResult
         * @static
         * @param {types.IPluginReadResult=} [properties] Properties to set
         * @returns {types.PluginReadResult} PluginReadResult instance
         */
        PluginReadResult.create = function create(properties) {
            return new PluginReadResult(properties);
        };

        /**
         * Encodes the specified PluginReadResult message. Does not implicitly {@link types.PluginReadResult.verify|verify} messages.
         * @function encode
         * @memberof types.PluginReadResult
         * @static
         * @param {types.IPluginReadResult} message PluginReadResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginReadResult.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.queryId != null && Object.hasOwnProperty.call(message, "queryId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.queryId);
            if (message.entries != null && message.entries.length)
                for (let i = 0; i < message.entries.length; ++i)
                    $root.types.PluginStateEntry.encode(message.entries[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginReadResult message, length delimited. Does not implicitly {@link types.PluginReadResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginReadResult
         * @static
         * @param {types.IPluginReadResult} message PluginReadResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginReadResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginReadResult message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginReadResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginReadResult} PluginReadResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginReadResult.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginReadResult();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.queryId = reader.uint64();
                        break;
                    }
                case 2: {
                        if (!(message.entries && message.entries.length))
                            message.entries = [];
                        message.entries.push($root.types.PluginStateEntry.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginReadResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginReadResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginReadResult} PluginReadResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginReadResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginReadResult message.
         * @function verify
         * @memberof types.PluginReadResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginReadResult.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.queryId != null && Object.hasOwnProperty.call(message, "queryId"))
                if (!$util.isInteger(message.queryId) && !(message.queryId && $util.isInteger(message.queryId.low) && $util.isInteger(message.queryId.high)))
                    return "queryId: integer|Long expected";
            if (message.entries != null && Object.hasOwnProperty.call(message, "entries")) {
                if (!Array.isArray(message.entries))
                    return "entries: array expected";
                for (let i = 0; i < message.entries.length; ++i) {
                    let error = $root.types.PluginStateEntry.verify(message.entries[i], long + 1);
                    if (error)
                        return "entries." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PluginReadResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginReadResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginReadResult} PluginReadResult
         */
        PluginReadResult.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginReadResult)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginReadResult: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginReadResult();
            if (object.queryId != null)
                if ($util.Long)
                    message.queryId = $util.Long.fromValue(object.queryId, true);
                else if (typeof object.queryId === "string")
                    message.queryId = parseInt(object.queryId, 10);
                else if (typeof object.queryId === "number")
                    message.queryId = object.queryId;
                else if (typeof object.queryId === "object")
                    message.queryId = new $util.LongBits(object.queryId.low >>> 0, object.queryId.high >>> 0).toNumber(true);
            if (object.entries) {
                if (!Array.isArray(object.entries))
                    throw TypeError(".types.PluginReadResult.entries: array expected");
                message.entries = [];
                for (let i = 0; i < object.entries.length; ++i) {
                    if (!$util.isObject(object.entries[i]))
                        throw TypeError(".types.PluginReadResult.entries: object expected");
                    message.entries[i] = $root.types.PluginStateEntry.fromObject(object.entries[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginReadResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginReadResult
         * @static
         * @param {types.PluginReadResult} message PluginReadResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginReadResult.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.entries = [];
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.queryId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.queryId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.queryId != null && Object.hasOwnProperty.call(message, "queryId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.queryId = typeof message.queryId === "number" ? BigInt(message.queryId) : $util.Long.fromBits(message.queryId.low >>> 0, message.queryId.high >>> 0, true).toBigInt();
                else if (typeof message.queryId === "number")
                    object.queryId = options.longs === String ? String(message.queryId) : message.queryId;
                else
                    object.queryId = options.longs === String ? $util.Long.prototype.toString.call(message.queryId) : options.longs === Number ? new $util.LongBits(message.queryId.low >>> 0, message.queryId.high >>> 0).toNumber(true) : message.queryId;
            if (message.entries && message.entries.length) {
                object.entries = [];
                for (let j = 0; j < message.entries.length; ++j)
                    object.entries[j] = $root.types.PluginStateEntry.toObject(message.entries[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this PluginReadResult to JSON.
         * @function toJSON
         * @memberof types.PluginReadResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginReadResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginReadResult
         * @function getTypeUrl
         * @memberof types.PluginReadResult
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginReadResult.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginReadResult";
        };

        return PluginReadResult;
    })();

    types.PluginStateWriteRequest = (function() {

        /**
         * Properties of a PluginStateWriteRequest.
         * @memberof types
         * @interface IPluginStateWriteRequest
         * @property {Array.<types.IPluginSetOp>|null} [sets] PluginStateWriteRequest sets
         * @property {Array.<types.IPluginDeleteOp>|null} [deletes] PluginStateWriteRequest deletes
         */

        /**
         * Constructs a new PluginStateWriteRequest.
         * @memberof types
         * @classdesc Represents a PluginStateWriteRequest.
         * @implements IPluginStateWriteRequest
         * @constructor
         * @param {types.IPluginStateWriteRequest=} [properties] Properties to set
         */
        function PluginStateWriteRequest(properties) {
            this.sets = [];
            this.deletes = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginStateWriteRequest sets.
         * @member {Array.<types.IPluginSetOp>} sets
         * @memberof types.PluginStateWriteRequest
         * @instance
         */
        PluginStateWriteRequest.prototype.sets = $util.emptyArray;

        /**
         * PluginStateWriteRequest deletes.
         * @member {Array.<types.IPluginDeleteOp>} deletes
         * @memberof types.PluginStateWriteRequest
         * @instance
         */
        PluginStateWriteRequest.prototype.deletes = $util.emptyArray;

        /**
         * Creates a new PluginStateWriteRequest instance using the specified properties.
         * @function create
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {types.IPluginStateWriteRequest=} [properties] Properties to set
         * @returns {types.PluginStateWriteRequest} PluginStateWriteRequest instance
         */
        PluginStateWriteRequest.create = function create(properties) {
            return new PluginStateWriteRequest(properties);
        };

        /**
         * Encodes the specified PluginStateWriteRequest message. Does not implicitly {@link types.PluginStateWriteRequest.verify|verify} messages.
         * @function encode
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {types.IPluginStateWriteRequest} message PluginStateWriteRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateWriteRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.sets != null && message.sets.length)
                for (let i = 0; i < message.sets.length; ++i)
                    $root.types.PluginSetOp.encode(message.sets[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.deletes != null && message.deletes.length)
                for (let i = 0; i < message.deletes.length; ++i)
                    $root.types.PluginDeleteOp.encode(message.deletes[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginStateWriteRequest message, length delimited. Does not implicitly {@link types.PluginStateWriteRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {types.IPluginStateWriteRequest} message PluginStateWriteRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateWriteRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginStateWriteRequest message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginStateWriteRequest} PluginStateWriteRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateWriteRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginStateWriteRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.sets && message.sets.length))
                            message.sets = [];
                        message.sets.push($root.types.PluginSetOp.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        if (!(message.deletes && message.deletes.length))
                            message.deletes = [];
                        message.deletes.push($root.types.PluginDeleteOp.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginStateWriteRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginStateWriteRequest} PluginStateWriteRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateWriteRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginStateWriteRequest message.
         * @function verify
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginStateWriteRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.sets != null && Object.hasOwnProperty.call(message, "sets")) {
                if (!Array.isArray(message.sets))
                    return "sets: array expected";
                for (let i = 0; i < message.sets.length; ++i) {
                    let error = $root.types.PluginSetOp.verify(message.sets[i], long + 1);
                    if (error)
                        return "sets." + error;
                }
            }
            if (message.deletes != null && Object.hasOwnProperty.call(message, "deletes")) {
                if (!Array.isArray(message.deletes))
                    return "deletes: array expected";
                for (let i = 0; i < message.deletes.length; ++i) {
                    let error = $root.types.PluginDeleteOp.verify(message.deletes[i], long + 1);
                    if (error)
                        return "deletes." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PluginStateWriteRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginStateWriteRequest} PluginStateWriteRequest
         */
        PluginStateWriteRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginStateWriteRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginStateWriteRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginStateWriteRequest();
            if (object.sets) {
                if (!Array.isArray(object.sets))
                    throw TypeError(".types.PluginStateWriteRequest.sets: array expected");
                message.sets = [];
                for (let i = 0; i < object.sets.length; ++i) {
                    if (!$util.isObject(object.sets[i]))
                        throw TypeError(".types.PluginStateWriteRequest.sets: object expected");
                    message.sets[i] = $root.types.PluginSetOp.fromObject(object.sets[i], long + 1);
                }
            }
            if (object.deletes) {
                if (!Array.isArray(object.deletes))
                    throw TypeError(".types.PluginStateWriteRequest.deletes: array expected");
                message.deletes = [];
                for (let i = 0; i < object.deletes.length; ++i) {
                    if (!$util.isObject(object.deletes[i]))
                        throw TypeError(".types.PluginStateWriteRequest.deletes: object expected");
                    message.deletes[i] = $root.types.PluginDeleteOp.fromObject(object.deletes[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginStateWriteRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {types.PluginStateWriteRequest} message PluginStateWriteRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginStateWriteRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.sets = [];
                object.deletes = [];
            }
            if (message.sets && message.sets.length) {
                object.sets = [];
                for (let j = 0; j < message.sets.length; ++j)
                    object.sets[j] = $root.types.PluginSetOp.toObject(message.sets[j], options, q + 1);
            }
            if (message.deletes && message.deletes.length) {
                object.deletes = [];
                for (let j = 0; j < message.deletes.length; ++j)
                    object.deletes[j] = $root.types.PluginDeleteOp.toObject(message.deletes[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this PluginStateWriteRequest to JSON.
         * @function toJSON
         * @memberof types.PluginStateWriteRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginStateWriteRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginStateWriteRequest
         * @function getTypeUrl
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginStateWriteRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginStateWriteRequest";
        };

        return PluginStateWriteRequest;
    })();

    types.PluginStateWriteResponse = (function() {

        /**
         * Properties of a PluginStateWriteResponse.
         * @memberof types
         * @interface IPluginStateWriteResponse
         * @property {types.IPluginError|null} [error] PluginStateWriteResponse error
         */

        /**
         * Constructs a new PluginStateWriteResponse.
         * @memberof types
         * @classdesc Represents a PluginStateWriteResponse.
         * @implements IPluginStateWriteResponse
         * @constructor
         * @param {types.IPluginStateWriteResponse=} [properties] Properties to set
         */
        function PluginStateWriteResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginStateWriteResponse error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.PluginStateWriteResponse
         * @instance
         */
        PluginStateWriteResponse.prototype.error = null;

        /**
         * Creates a new PluginStateWriteResponse instance using the specified properties.
         * @function create
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {types.IPluginStateWriteResponse=} [properties] Properties to set
         * @returns {types.PluginStateWriteResponse} PluginStateWriteResponse instance
         */
        PluginStateWriteResponse.create = function create(properties) {
            return new PluginStateWriteResponse(properties);
        };

        /**
         * Encodes the specified PluginStateWriteResponse message. Does not implicitly {@link types.PluginStateWriteResponse.verify|verify} messages.
         * @function encode
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {types.IPluginStateWriteResponse} message PluginStateWriteResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateWriteResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginStateWriteResponse message, length delimited. Does not implicitly {@link types.PluginStateWriteResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {types.IPluginStateWriteResponse} message PluginStateWriteResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateWriteResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginStateWriteResponse message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginStateWriteResponse} PluginStateWriteResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateWriteResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginStateWriteResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginStateWriteResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginStateWriteResponse} PluginStateWriteResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateWriteResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginStateWriteResponse message.
         * @function verify
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginStateWriteResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.error != null && Object.hasOwnProperty.call(message, "error")) {
                let error = $root.types.PluginError.verify(message.error, long + 1);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a PluginStateWriteResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginStateWriteResponse} PluginStateWriteResponse
         */
        PluginStateWriteResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginStateWriteResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginStateWriteResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginStateWriteResponse();
            if (object.error != null) {
                if (!$util.isObject(object.error))
                    throw TypeError(".types.PluginStateWriteResponse.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginStateWriteResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {types.PluginStateWriteResponse} message PluginStateWriteResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginStateWriteResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.error = null;
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                object.error = $root.types.PluginError.toObject(message.error, options, q + 1);
            return object;
        };

        /**
         * Converts this PluginStateWriteResponse to JSON.
         * @function toJSON
         * @memberof types.PluginStateWriteResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginStateWriteResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginStateWriteResponse
         * @function getTypeUrl
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginStateWriteResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginStateWriteResponse";
        };

        return PluginStateWriteResponse;
    })();

    types.PluginSetOp = (function() {

        /**
         * Properties of a PluginSetOp.
         * @memberof types
         * @interface IPluginSetOp
         * @property {Uint8Array|null} [key] PluginSetOp key
         * @property {Uint8Array|null} [value] PluginSetOp value
         */

        /**
         * Constructs a new PluginSetOp.
         * @memberof types
         * @classdesc Represents a PluginSetOp.
         * @implements IPluginSetOp
         * @constructor
         * @param {types.IPluginSetOp=} [properties] Properties to set
         */
        function PluginSetOp(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginSetOp key.
         * @member {Uint8Array} key
         * @memberof types.PluginSetOp
         * @instance
         */
        PluginSetOp.prototype.key = $util.newBuffer([]);

        /**
         * PluginSetOp value.
         * @member {Uint8Array} value
         * @memberof types.PluginSetOp
         * @instance
         */
        PluginSetOp.prototype.value = $util.newBuffer([]);

        /**
         * Creates a new PluginSetOp instance using the specified properties.
         * @function create
         * @memberof types.PluginSetOp
         * @static
         * @param {types.IPluginSetOp=} [properties] Properties to set
         * @returns {types.PluginSetOp} PluginSetOp instance
         */
        PluginSetOp.create = function create(properties) {
            return new PluginSetOp(properties);
        };

        /**
         * Encodes the specified PluginSetOp message. Does not implicitly {@link types.PluginSetOp.verify|verify} messages.
         * @function encode
         * @memberof types.PluginSetOp
         * @static
         * @param {types.IPluginSetOp} message PluginSetOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginSetOp.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
            return writer;
        };

        /**
         * Encodes the specified PluginSetOp message, length delimited. Does not implicitly {@link types.PluginSetOp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginSetOp
         * @static
         * @param {types.IPluginSetOp} message PluginSetOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginSetOp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginSetOp message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginSetOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginSetOp} PluginSetOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginSetOp.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginSetOp();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.key = reader.bytes();
                        break;
                    }
                case 2: {
                        message.value = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginSetOp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginSetOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginSetOp} PluginSetOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginSetOp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginSetOp message.
         * @function verify
         * @memberof types.PluginSetOp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginSetOp.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                    return "value: buffer expected";
            return null;
        };

        /**
         * Creates a PluginSetOp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginSetOp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginSetOp} PluginSetOp
         */
        PluginSetOp.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginSetOp)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginSetOp: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginSetOp();
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length >= 0)
                    message.key = object.key;
            if (object.value != null)
                if (typeof object.value === "string")
                    $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                else if (object.value.length >= 0)
                    message.value = object.value;
            return message;
        };

        /**
         * Creates a plain object from a PluginSetOp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginSetOp
         * @static
         * @param {types.PluginSetOp} message PluginSetOp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginSetOp.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
                if (options.bytes === String)
                    object.value = "";
                else {
                    object.value = [];
                    if (options.bytes !== Array)
                        object.value = $util.newBuffer(object.value);
                }
            }
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
            return object;
        };

        /**
         * Converts this PluginSetOp to JSON.
         * @function toJSON
         * @memberof types.PluginSetOp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginSetOp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginSetOp
         * @function getTypeUrl
         * @memberof types.PluginSetOp
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginSetOp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginSetOp";
        };

        return PluginSetOp;
    })();

    types.PluginDeleteOp = (function() {

        /**
         * Properties of a PluginDeleteOp.
         * @memberof types
         * @interface IPluginDeleteOp
         * @property {Uint8Array|null} [key] PluginDeleteOp key
         */

        /**
         * Constructs a new PluginDeleteOp.
         * @memberof types
         * @classdesc Represents a PluginDeleteOp.
         * @implements IPluginDeleteOp
         * @constructor
         * @param {types.IPluginDeleteOp=} [properties] Properties to set
         */
        function PluginDeleteOp(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginDeleteOp key.
         * @member {Uint8Array} key
         * @memberof types.PluginDeleteOp
         * @instance
         */
        PluginDeleteOp.prototype.key = $util.newBuffer([]);

        /**
         * Creates a new PluginDeleteOp instance using the specified properties.
         * @function create
         * @memberof types.PluginDeleteOp
         * @static
         * @param {types.IPluginDeleteOp=} [properties] Properties to set
         * @returns {types.PluginDeleteOp} PluginDeleteOp instance
         */
        PluginDeleteOp.create = function create(properties) {
            return new PluginDeleteOp(properties);
        };

        /**
         * Encodes the specified PluginDeleteOp message. Does not implicitly {@link types.PluginDeleteOp.verify|verify} messages.
         * @function encode
         * @memberof types.PluginDeleteOp
         * @static
         * @param {types.IPluginDeleteOp} message PluginDeleteOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginDeleteOp.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
            return writer;
        };

        /**
         * Encodes the specified PluginDeleteOp message, length delimited. Does not implicitly {@link types.PluginDeleteOp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginDeleteOp
         * @static
         * @param {types.IPluginDeleteOp} message PluginDeleteOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginDeleteOp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginDeleteOp message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginDeleteOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginDeleteOp} PluginDeleteOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginDeleteOp.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginDeleteOp();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.key = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginDeleteOp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginDeleteOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginDeleteOp} PluginDeleteOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginDeleteOp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginDeleteOp message.
         * @function verify
         * @memberof types.PluginDeleteOp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginDeleteOp.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            return null;
        };

        /**
         * Creates a PluginDeleteOp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginDeleteOp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginDeleteOp} PluginDeleteOp
         */
        PluginDeleteOp.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginDeleteOp)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginDeleteOp: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginDeleteOp();
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length >= 0)
                    message.key = object.key;
            return message;
        };

        /**
         * Creates a plain object from a PluginDeleteOp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginDeleteOp
         * @static
         * @param {types.PluginDeleteOp} message PluginDeleteOp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginDeleteOp.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            return object;
        };

        /**
         * Converts this PluginDeleteOp to JSON.
         * @function toJSON
         * @memberof types.PluginDeleteOp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginDeleteOp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginDeleteOp
         * @function getTypeUrl
         * @memberof types.PluginDeleteOp
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginDeleteOp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginDeleteOp";
        };

        return PluginDeleteOp;
    })();

    types.PluginStateEntry = (function() {

        /**
         * Properties of a PluginStateEntry.
         * @memberof types
         * @interface IPluginStateEntry
         * @property {Uint8Array|null} [key] PluginStateEntry key
         * @property {Uint8Array|null} [value] PluginStateEntry value
         */

        /**
         * Constructs a new PluginStateEntry.
         * @memberof types
         * @classdesc Represents a PluginStateEntry.
         * @implements IPluginStateEntry
         * @constructor
         * @param {types.IPluginStateEntry=} [properties] Properties to set
         */
        function PluginStateEntry(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginStateEntry key.
         * @member {Uint8Array} key
         * @memberof types.PluginStateEntry
         * @instance
         */
        PluginStateEntry.prototype.key = $util.newBuffer([]);

        /**
         * PluginStateEntry value.
         * @member {Uint8Array} value
         * @memberof types.PluginStateEntry
         * @instance
         */
        PluginStateEntry.prototype.value = $util.newBuffer([]);

        /**
         * Creates a new PluginStateEntry instance using the specified properties.
         * @function create
         * @memberof types.PluginStateEntry
         * @static
         * @param {types.IPluginStateEntry=} [properties] Properties to set
         * @returns {types.PluginStateEntry} PluginStateEntry instance
         */
        PluginStateEntry.create = function create(properties) {
            return new PluginStateEntry(properties);
        };

        /**
         * Encodes the specified PluginStateEntry message. Does not implicitly {@link types.PluginStateEntry.verify|verify} messages.
         * @function encode
         * @memberof types.PluginStateEntry
         * @static
         * @param {types.IPluginStateEntry} message PluginStateEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateEntry.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
            return writer;
        };

        /**
         * Encodes the specified PluginStateEntry message, length delimited. Does not implicitly {@link types.PluginStateEntry.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginStateEntry
         * @static
         * @param {types.IPluginStateEntry} message PluginStateEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateEntry.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PluginStateEntry message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginStateEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginStateEntry} PluginStateEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateEntry.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginStateEntry();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.key = reader.bytes();
                        break;
                    }
                case 2: {
                        message.value = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginStateEntry message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginStateEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginStateEntry} PluginStateEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateEntry.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginStateEntry message.
         * @function verify
         * @memberof types.PluginStateEntry
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginStateEntry.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                    return "value: buffer expected";
            return null;
        };

        /**
         * Creates a PluginStateEntry message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginStateEntry
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginStateEntry} PluginStateEntry
         */
        PluginStateEntry.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.PluginStateEntry)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.PluginStateEntry: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.PluginStateEntry();
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length >= 0)
                    message.key = object.key;
            if (object.value != null)
                if (typeof object.value === "string")
                    $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                else if (object.value.length >= 0)
                    message.value = object.value;
            return message;
        };

        /**
         * Creates a plain object from a PluginStateEntry message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginStateEntry
         * @static
         * @param {types.PluginStateEntry} message PluginStateEntry
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginStateEntry.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
                if (options.bytes === String)
                    object.value = "";
                else {
                    object.value = [];
                    if (options.bytes !== Array)
                        object.value = $util.newBuffer(object.value);
                }
            }
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
            return object;
        };

        /**
         * Converts this PluginStateEntry to JSON.
         * @function toJSON
         * @memberof types.PluginStateEntry
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginStateEntry.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginStateEntry
         * @function getTypeUrl
         * @memberof types.PluginStateEntry
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginStateEntry.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginStateEntry";
        };

        return PluginStateEntry;
    })();

    types.Transaction = (function() {

        /**
         * Properties of a Transaction.
         * @memberof types
         * @interface ITransaction
         * @property {string|null} [messageType] Transaction messageType
         * @property {google.protobuf.IAny|null} [msg] Transaction msg
         * @property {types.ISignature|null} [signature] Transaction signature
         * @property {number|Long|null} [createdHeight] Transaction createdHeight
         * @property {number|Long|null} [time] Transaction time
         * @property {number|Long|null} [fee] Transaction fee
         * @property {string|null} [memo] Transaction memo
         * @property {number|Long|null} [networkId] Transaction networkId
         * @property {number|Long|null} [chainId] Transaction chainId
         */

        /**
         * Constructs a new Transaction.
         * @memberof types
         * @classdesc Represents a Transaction.
         * @implements ITransaction
         * @constructor
         * @param {types.ITransaction=} [properties] Properties to set
         */
        function Transaction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Transaction messageType.
         * @member {string} messageType
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.messageType = "";

        /**
         * Transaction msg.
         * @member {google.protobuf.IAny|null|undefined} msg
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.msg = null;

        /**
         * Transaction signature.
         * @member {types.ISignature|null|undefined} signature
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.signature = null;

        /**
         * Transaction createdHeight.
         * @member {number|Long} createdHeight
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.createdHeight = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Transaction time.
         * @member {number|Long} time
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Transaction fee.
         * @member {number|Long} fee
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.fee = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Transaction memo.
         * @member {string} memo
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.memo = "";

        /**
         * Transaction networkId.
         * @member {number|Long} networkId
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.networkId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Transaction chainId.
         * @member {number|Long} chainId
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.chainId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Transaction instance using the specified properties.
         * @function create
         * @memberof types.Transaction
         * @static
         * @param {types.ITransaction=} [properties] Properties to set
         * @returns {types.Transaction} Transaction instance
         */
        Transaction.create = function create(properties) {
            return new Transaction(properties);
        };

        /**
         * Encodes the specified Transaction message. Does not implicitly {@link types.Transaction.verify|verify} messages.
         * @function encode
         * @memberof types.Transaction
         * @static
         * @param {types.ITransaction} message Transaction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Transaction.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.messageType != null && Object.hasOwnProperty.call(message, "messageType"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.messageType);
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                $root.google.protobuf.Any.encode(message.msg, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                $root.types.Signature.encode(message.signature, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.createdHeight != null && Object.hasOwnProperty.call(message, "createdHeight"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.createdHeight);
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.time);
            if (message.fee != null && Object.hasOwnProperty.call(message, "fee"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.fee);
            if (message.memo != null && Object.hasOwnProperty.call(message, "memo"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.memo);
            if (message.networkId != null && Object.hasOwnProperty.call(message, "networkId"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.networkId);
            if (message.chainId != null && Object.hasOwnProperty.call(message, "chainId"))
                writer.uint32(/* id 9, wireType 0 =*/72).uint64(message.chainId);
            return writer;
        };

        /**
         * Encodes the specified Transaction message, length delimited. Does not implicitly {@link types.Transaction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Transaction
         * @static
         * @param {types.ITransaction} message Transaction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Transaction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Transaction message from the specified reader or buffer.
         * @function decode
         * @memberof types.Transaction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Transaction} Transaction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Transaction.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Transaction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.messageType = reader.string();
                        break;
                    }
                case 2: {
                        message.msg = $root.google.protobuf.Any.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.signature = $root.types.Signature.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 4: {
                        message.createdHeight = reader.uint64();
                        break;
                    }
                case 5: {
                        message.time = reader.uint64();
                        break;
                    }
                case 6: {
                        message.fee = reader.uint64();
                        break;
                    }
                case 7: {
                        message.memo = reader.string();
                        break;
                    }
                case 8: {
                        message.networkId = reader.uint64();
                        break;
                    }
                case 9: {
                        message.chainId = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Transaction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Transaction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Transaction} Transaction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Transaction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Transaction message.
         * @function verify
         * @memberof types.Transaction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Transaction.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.messageType != null && Object.hasOwnProperty.call(message, "messageType"))
                if (!$util.isString(message.messageType))
                    return "messageType: string expected";
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg")) {
                let error = $root.google.protobuf.Any.verify(message.msg, long + 1);
                if (error)
                    return "msg." + error;
            }
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature")) {
                let error = $root.types.Signature.verify(message.signature, long + 1);
                if (error)
                    return "signature." + error;
            }
            if (message.createdHeight != null && Object.hasOwnProperty.call(message, "createdHeight"))
                if (!$util.isInteger(message.createdHeight) && !(message.createdHeight && $util.isInteger(message.createdHeight.low) && $util.isInteger(message.createdHeight.high)))
                    return "createdHeight: integer|Long expected";
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            if (message.fee != null && Object.hasOwnProperty.call(message, "fee"))
                if (!$util.isInteger(message.fee) && !(message.fee && $util.isInteger(message.fee.low) && $util.isInteger(message.fee.high)))
                    return "fee: integer|Long expected";
            if (message.memo != null && Object.hasOwnProperty.call(message, "memo"))
                if (!$util.isString(message.memo))
                    return "memo: string expected";
            if (message.networkId != null && Object.hasOwnProperty.call(message, "networkId"))
                if (!$util.isInteger(message.networkId) && !(message.networkId && $util.isInteger(message.networkId.low) && $util.isInteger(message.networkId.high)))
                    return "networkId: integer|Long expected";
            if (message.chainId != null && Object.hasOwnProperty.call(message, "chainId"))
                if (!$util.isInteger(message.chainId) && !(message.chainId && $util.isInteger(message.chainId.low) && $util.isInteger(message.chainId.high)))
                    return "chainId: integer|Long expected";
            return null;
        };

        /**
         * Creates a Transaction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Transaction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Transaction} Transaction
         */
        Transaction.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.Transaction)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.Transaction: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.Transaction();
            if (object.messageType != null)
                message.messageType = String(object.messageType);
            if (object.msg != null) {
                if (!$util.isObject(object.msg))
                    throw TypeError(".types.Transaction.msg: object expected");
                message.msg = $root.google.protobuf.Any.fromObject(object.msg, long + 1);
            }
            if (object.signature != null) {
                if (!$util.isObject(object.signature))
                    throw TypeError(".types.Transaction.signature: object expected");
                message.signature = $root.types.Signature.fromObject(object.signature, long + 1);
            }
            if (object.createdHeight != null)
                if ($util.Long)
                    message.createdHeight = $util.Long.fromValue(object.createdHeight, true);
                else if (typeof object.createdHeight === "string")
                    message.createdHeight = parseInt(object.createdHeight, 10);
                else if (typeof object.createdHeight === "number")
                    message.createdHeight = object.createdHeight;
                else if (typeof object.createdHeight === "object")
                    message.createdHeight = new $util.LongBits(object.createdHeight.low >>> 0, object.createdHeight.high >>> 0).toNumber(true);
            if (object.time != null)
                if ($util.Long)
                    message.time = $util.Long.fromValue(object.time, true);
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
            if (object.fee != null)
                if ($util.Long)
                    message.fee = $util.Long.fromValue(object.fee, true);
                else if (typeof object.fee === "string")
                    message.fee = parseInt(object.fee, 10);
                else if (typeof object.fee === "number")
                    message.fee = object.fee;
                else if (typeof object.fee === "object")
                    message.fee = new $util.LongBits(object.fee.low >>> 0, object.fee.high >>> 0).toNumber(true);
            if (object.memo != null)
                message.memo = String(object.memo);
            if (object.networkId != null)
                if ($util.Long)
                    message.networkId = $util.Long.fromValue(object.networkId, true);
                else if (typeof object.networkId === "string")
                    message.networkId = parseInt(object.networkId, 10);
                else if (typeof object.networkId === "number")
                    message.networkId = object.networkId;
                else if (typeof object.networkId === "object")
                    message.networkId = new $util.LongBits(object.networkId.low >>> 0, object.networkId.high >>> 0).toNumber(true);
            if (object.chainId != null)
                if ($util.Long)
                    message.chainId = $util.Long.fromValue(object.chainId, true);
                else if (typeof object.chainId === "string")
                    message.chainId = parseInt(object.chainId, 10);
                else if (typeof object.chainId === "number")
                    message.chainId = object.chainId;
                else if (typeof object.chainId === "object")
                    message.chainId = new $util.LongBits(object.chainId.low >>> 0, object.chainId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Transaction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Transaction
         * @static
         * @param {types.Transaction} message Transaction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Transaction.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.messageType = "";
                object.msg = null;
                object.signature = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.createdHeight = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.createdHeight = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.time = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.fee = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.fee = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.memo = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.networkId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.networkId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.chainId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.chainId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.messageType != null && Object.hasOwnProperty.call(message, "messageType"))
                object.messageType = message.messageType;
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                object.msg = $root.google.protobuf.Any.toObject(message.msg, options, q + 1);
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                object.signature = $root.types.Signature.toObject(message.signature, options, q + 1);
            if (message.createdHeight != null && Object.hasOwnProperty.call(message, "createdHeight"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.createdHeight = typeof message.createdHeight === "number" ? BigInt(message.createdHeight) : $util.Long.fromBits(message.createdHeight.low >>> 0, message.createdHeight.high >>> 0, true).toBigInt();
                else if (typeof message.createdHeight === "number")
                    object.createdHeight = options.longs === String ? String(message.createdHeight) : message.createdHeight;
                else
                    object.createdHeight = options.longs === String ? $util.Long.prototype.toString.call(message.createdHeight) : options.longs === Number ? new $util.LongBits(message.createdHeight.low >>> 0, message.createdHeight.high >>> 0).toNumber(true) : message.createdHeight;
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.time = typeof message.time === "number" ? BigInt(message.time) : $util.Long.fromBits(message.time.low >>> 0, message.time.high >>> 0, true).toBigInt();
                else if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
            if (message.fee != null && Object.hasOwnProperty.call(message, "fee"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.fee = typeof message.fee === "number" ? BigInt(message.fee) : $util.Long.fromBits(message.fee.low >>> 0, message.fee.high >>> 0, true).toBigInt();
                else if (typeof message.fee === "number")
                    object.fee = options.longs === String ? String(message.fee) : message.fee;
                else
                    object.fee = options.longs === String ? $util.Long.prototype.toString.call(message.fee) : options.longs === Number ? new $util.LongBits(message.fee.low >>> 0, message.fee.high >>> 0).toNumber(true) : message.fee;
            if (message.memo != null && Object.hasOwnProperty.call(message, "memo"))
                object.memo = message.memo;
            if (message.networkId != null && Object.hasOwnProperty.call(message, "networkId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.networkId = typeof message.networkId === "number" ? BigInt(message.networkId) : $util.Long.fromBits(message.networkId.low >>> 0, message.networkId.high >>> 0, true).toBigInt();
                else if (typeof message.networkId === "number")
                    object.networkId = options.longs === String ? String(message.networkId) : message.networkId;
                else
                    object.networkId = options.longs === String ? $util.Long.prototype.toString.call(message.networkId) : options.longs === Number ? new $util.LongBits(message.networkId.low >>> 0, message.networkId.high >>> 0).toNumber(true) : message.networkId;
            if (message.chainId != null && Object.hasOwnProperty.call(message, "chainId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.chainId = typeof message.chainId === "number" ? BigInt(message.chainId) : $util.Long.fromBits(message.chainId.low >>> 0, message.chainId.high >>> 0, true).toBigInt();
                else if (typeof message.chainId === "number")
                    object.chainId = options.longs === String ? String(message.chainId) : message.chainId;
                else
                    object.chainId = options.longs === String ? $util.Long.prototype.toString.call(message.chainId) : options.longs === Number ? new $util.LongBits(message.chainId.low >>> 0, message.chainId.high >>> 0).toNumber(true) : message.chainId;
            return object;
        };

        /**
         * Converts this Transaction to JSON.
         * @function toJSON
         * @memberof types.Transaction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Transaction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Transaction
         * @function getTypeUrl
         * @memberof types.Transaction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Transaction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Transaction";
        };

        return Transaction;
    })();

    types.MessageSend = (function() {

        /**
         * Properties of a MessageSend.
         * @memberof types
         * @interface IMessageSend
         * @property {Uint8Array|null} [fromAddress] MessageSend fromAddress
         * @property {Uint8Array|null} [toAddress] MessageSend toAddress
         * @property {number|Long|null} [amount] MessageSend amount
         */

        /**
         * Constructs a new MessageSend.
         * @memberof types
         * @classdesc Represents a MessageSend.
         * @implements IMessageSend
         * @constructor
         * @param {types.IMessageSend=} [properties] Properties to set
         */
        function MessageSend(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageSend fromAddress.
         * @member {Uint8Array} fromAddress
         * @memberof types.MessageSend
         * @instance
         */
        MessageSend.prototype.fromAddress = $util.newBuffer([]);

        /**
         * MessageSend toAddress.
         * @member {Uint8Array} toAddress
         * @memberof types.MessageSend
         * @instance
         */
        MessageSend.prototype.toAddress = $util.newBuffer([]);

        /**
         * MessageSend amount.
         * @member {number|Long} amount
         * @memberof types.MessageSend
         * @instance
         */
        MessageSend.prototype.amount = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new MessageSend instance using the specified properties.
         * @function create
         * @memberof types.MessageSend
         * @static
         * @param {types.IMessageSend=} [properties] Properties to set
         * @returns {types.MessageSend} MessageSend instance
         */
        MessageSend.create = function create(properties) {
            return new MessageSend(properties);
        };

        /**
         * Encodes the specified MessageSend message. Does not implicitly {@link types.MessageSend.verify|verify} messages.
         * @function encode
         * @memberof types.MessageSend
         * @static
         * @param {types.IMessageSend} message MessageSend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageSend.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.fromAddress != null && Object.hasOwnProperty.call(message, "fromAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.fromAddress);
            if (message.toAddress != null && Object.hasOwnProperty.call(message, "toAddress"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.toAddress);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.amount);
            return writer;
        };

        /**
         * Encodes the specified MessageSend message, length delimited. Does not implicitly {@link types.MessageSend.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessageSend
         * @static
         * @param {types.IMessageSend} message MessageSend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageSend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a MessageSend message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessageSend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessageSend} MessageSend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageSend.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessageSend();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.fromAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.toAddress = reader.bytes();
                        break;
                    }
                case 3: {
                        message.amount = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageSend message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessageSend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessageSend} MessageSend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageSend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageSend message.
         * @function verify
         * @memberof types.MessageSend
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageSend.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.fromAddress != null && Object.hasOwnProperty.call(message, "fromAddress"))
                if (!(message.fromAddress && typeof message.fromAddress.length === "number" || $util.isString(message.fromAddress)))
                    return "fromAddress: buffer expected";
            if (message.toAddress != null && Object.hasOwnProperty.call(message, "toAddress"))
                if (!(message.toAddress && typeof message.toAddress.length === "number" || $util.isString(message.toAddress)))
                    return "toAddress: buffer expected";
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                if (!$util.isInteger(message.amount) && !(message.amount && $util.isInteger(message.amount.low) && $util.isInteger(message.amount.high)))
                    return "amount: integer|Long expected";
            return null;
        };

        /**
         * Creates a MessageSend message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessageSend
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessageSend} MessageSend
         */
        MessageSend.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.MessageSend)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.MessageSend: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.MessageSend();
            if (object.fromAddress != null)
                if (typeof object.fromAddress === "string")
                    $util.base64.decode(object.fromAddress, message.fromAddress = $util.newBuffer($util.base64.length(object.fromAddress)), 0);
                else if (object.fromAddress.length >= 0)
                    message.fromAddress = object.fromAddress;
            if (object.toAddress != null)
                if (typeof object.toAddress === "string")
                    $util.base64.decode(object.toAddress, message.toAddress = $util.newBuffer($util.base64.length(object.toAddress)), 0);
                else if (object.toAddress.length >= 0)
                    message.toAddress = object.toAddress;
            if (object.amount != null)
                if ($util.Long)
                    message.amount = $util.Long.fromValue(object.amount, true);
                else if (typeof object.amount === "string")
                    message.amount = parseInt(object.amount, 10);
                else if (typeof object.amount === "number")
                    message.amount = object.amount;
                else if (typeof object.amount === "object")
                    message.amount = new $util.LongBits(object.amount.low >>> 0, object.amount.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a MessageSend message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessageSend
         * @static
         * @param {types.MessageSend} message MessageSend
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageSend.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.fromAddress = "";
                else {
                    object.fromAddress = [];
                    if (options.bytes !== Array)
                        object.fromAddress = $util.newBuffer(object.fromAddress);
                }
                if (options.bytes === String)
                    object.toAddress = "";
                else {
                    object.toAddress = [];
                    if (options.bytes !== Array)
                        object.toAddress = $util.newBuffer(object.toAddress);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.amount = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.fromAddress != null && Object.hasOwnProperty.call(message, "fromAddress"))
                object.fromAddress = options.bytes === String ? $util.base64.encode(message.fromAddress, 0, message.fromAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.fromAddress) : message.fromAddress;
            if (message.toAddress != null && Object.hasOwnProperty.call(message, "toAddress"))
                object.toAddress = options.bytes === String ? $util.base64.encode(message.toAddress, 0, message.toAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.toAddress) : message.toAddress;
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.amount = typeof message.amount === "number" ? BigInt(message.amount) : $util.Long.fromBits(message.amount.low >>> 0, message.amount.high >>> 0, true).toBigInt();
                else if (typeof message.amount === "number")
                    object.amount = options.longs === String ? String(message.amount) : message.amount;
                else
                    object.amount = options.longs === String ? $util.Long.prototype.toString.call(message.amount) : options.longs === Number ? new $util.LongBits(message.amount.low >>> 0, message.amount.high >>> 0).toNumber(true) : message.amount;
            return object;
        };

        /**
         * Converts this MessageSend to JSON.
         * @function toJSON
         * @memberof types.MessageSend
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageSend.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageSend
         * @function getTypeUrl
         * @memberof types.MessageSend
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageSend.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessageSend";
        };

        return MessageSend;
    })();

    types.FeeParams = (function() {

        /**
         * Properties of a FeeParams.
         * @memberof types
         * @interface IFeeParams
         * @property {number|Long|null} [sendFee] FeeParams sendFee
         */

        /**
         * Constructs a new FeeParams.
         * @memberof types
         * @classdesc Represents a FeeParams.
         * @implements IFeeParams
         * @constructor
         * @param {types.IFeeParams=} [properties] Properties to set
         */
        function FeeParams(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FeeParams sendFee.
         * @member {number|Long} sendFee
         * @memberof types.FeeParams
         * @instance
         */
        FeeParams.prototype.sendFee = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new FeeParams instance using the specified properties.
         * @function create
         * @memberof types.FeeParams
         * @static
         * @param {types.IFeeParams=} [properties] Properties to set
         * @returns {types.FeeParams} FeeParams instance
         */
        FeeParams.create = function create(properties) {
            return new FeeParams(properties);
        };

        /**
         * Encodes the specified FeeParams message. Does not implicitly {@link types.FeeParams.verify|verify} messages.
         * @function encode
         * @memberof types.FeeParams
         * @static
         * @param {types.IFeeParams} message FeeParams message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FeeParams.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.sendFee != null && Object.hasOwnProperty.call(message, "sendFee"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.sendFee);
            return writer;
        };

        /**
         * Encodes the specified FeeParams message, length delimited. Does not implicitly {@link types.FeeParams.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.FeeParams
         * @static
         * @param {types.IFeeParams} message FeeParams message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FeeParams.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a FeeParams message from the specified reader or buffer.
         * @function decode
         * @memberof types.FeeParams
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.FeeParams} FeeParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FeeParams.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.FeeParams();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sendFee = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FeeParams message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.FeeParams
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.FeeParams} FeeParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FeeParams.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FeeParams message.
         * @function verify
         * @memberof types.FeeParams
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FeeParams.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.sendFee != null && Object.hasOwnProperty.call(message, "sendFee"))
                if (!$util.isInteger(message.sendFee) && !(message.sendFee && $util.isInteger(message.sendFee.low) && $util.isInteger(message.sendFee.high)))
                    return "sendFee: integer|Long expected";
            return null;
        };

        /**
         * Creates a FeeParams message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.FeeParams
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.FeeParams} FeeParams
         */
        FeeParams.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.FeeParams)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.FeeParams: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.FeeParams();
            if (object.sendFee != null)
                if ($util.Long)
                    message.sendFee = $util.Long.fromValue(object.sendFee, true);
                else if (typeof object.sendFee === "string")
                    message.sendFee = parseInt(object.sendFee, 10);
                else if (typeof object.sendFee === "number")
                    message.sendFee = object.sendFee;
                else if (typeof object.sendFee === "object")
                    message.sendFee = new $util.LongBits(object.sendFee.low >>> 0, object.sendFee.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a FeeParams message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.FeeParams
         * @static
         * @param {types.FeeParams} message FeeParams
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FeeParams.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.sendFee = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.sendFee = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.sendFee != null && Object.hasOwnProperty.call(message, "sendFee"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.sendFee = typeof message.sendFee === "number" ? BigInt(message.sendFee) : $util.Long.fromBits(message.sendFee.low >>> 0, message.sendFee.high >>> 0, true).toBigInt();
                else if (typeof message.sendFee === "number")
                    object.sendFee = options.longs === String ? String(message.sendFee) : message.sendFee;
                else
                    object.sendFee = options.longs === String ? $util.Long.prototype.toString.call(message.sendFee) : options.longs === Number ? new $util.LongBits(message.sendFee.low >>> 0, message.sendFee.high >>> 0).toNumber(true) : message.sendFee;
            return object;
        };

        /**
         * Converts this FeeParams to JSON.
         * @function toJSON
         * @memberof types.FeeParams
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FeeParams.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for FeeParams
         * @function getTypeUrl
         * @memberof types.FeeParams
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        FeeParams.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.FeeParams";
        };

        return FeeParams;
    })();

    types.Signature = (function() {

        /**
         * Properties of a Signature.
         * @memberof types
         * @interface ISignature
         * @property {Uint8Array|null} [publicKey] Signature publicKey
         * @property {Uint8Array|null} [signature] Signature signature
         */

        /**
         * Constructs a new Signature.
         * @memberof types
         * @classdesc Represents a Signature.
         * @implements ISignature
         * @constructor
         * @param {types.ISignature=} [properties] Properties to set
         */
        function Signature(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Signature publicKey.
         * @member {Uint8Array} publicKey
         * @memberof types.Signature
         * @instance
         */
        Signature.prototype.publicKey = $util.newBuffer([]);

        /**
         * Signature signature.
         * @member {Uint8Array} signature
         * @memberof types.Signature
         * @instance
         */
        Signature.prototype.signature = $util.newBuffer([]);

        /**
         * Creates a new Signature instance using the specified properties.
         * @function create
         * @memberof types.Signature
         * @static
         * @param {types.ISignature=} [properties] Properties to set
         * @returns {types.Signature} Signature instance
         */
        Signature.create = function create(properties) {
            return new Signature(properties);
        };

        /**
         * Encodes the specified Signature message. Does not implicitly {@link types.Signature.verify|verify} messages.
         * @function encode
         * @memberof types.Signature
         * @static
         * @param {types.ISignature} message Signature message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Signature.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.publicKey);
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);
            return writer;
        };

        /**
         * Encodes the specified Signature message, length delimited. Does not implicitly {@link types.Signature.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Signature
         * @static
         * @param {types.ISignature} message Signature message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Signature.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Signature message from the specified reader or buffer.
         * @function decode
         * @memberof types.Signature
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Signature} Signature
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Signature.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Signature();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.publicKey = reader.bytes();
                        break;
                    }
                case 2: {
                        message.signature = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Signature message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Signature
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Signature} Signature
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Signature.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Signature message.
         * @function verify
         * @memberof types.Signature
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Signature.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                    return "publicKey: buffer expected";
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                    return "signature: buffer expected";
            return null;
        };

        /**
         * Creates a Signature message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Signature
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Signature} Signature
         */
        Signature.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.Signature)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.Signature: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.Signature();
            if (object.publicKey != null)
                if (typeof object.publicKey === "string")
                    $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
                else if (object.publicKey.length >= 0)
                    message.publicKey = object.publicKey;
            if (object.signature != null)
                if (typeof object.signature === "string")
                    $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                else if (object.signature.length >= 0)
                    message.signature = object.signature;
            return message;
        };

        /**
         * Creates a plain object from a Signature message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Signature
         * @static
         * @param {types.Signature} message Signature
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Signature.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.publicKey = "";
                else {
                    object.publicKey = [];
                    if (options.bytes !== Array)
                        object.publicKey = $util.newBuffer(object.publicKey);
                }
                if (options.bytes === String)
                    object.signature = "";
                else {
                    object.signature = [];
                    if (options.bytes !== Array)
                        object.signature = $util.newBuffer(object.signature);
                }
            }
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
            return object;
        };

        /**
         * Converts this Signature to JSON.
         * @function toJSON
         * @memberof types.Signature
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Signature.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Signature
         * @function getTypeUrl
         * @memberof types.Signature
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Signature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Signature";
        };

        return Signature;
    })();

    types.MessageCreateBounty = (function() {

        /**
         * Properties of a MessageCreateBounty.
         * @memberof types
         * @interface IMessageCreateBounty
         * @property {Uint8Array|null} [signerAddress] MessageCreateBounty signerAddress
         * @property {string|null} [title] MessageCreateBounty title
         * @property {string|null} [description] MessageCreateBounty description
         * @property {number|Long|null} [reward] MessageCreateBounty reward
         * @property {number|Long|null} [deadline] MessageCreateBounty deadline
         */

        /**
         * Constructs a new MessageCreateBounty.
         * @memberof types
         * @classdesc Represents a MessageCreateBounty.
         * @implements IMessageCreateBounty
         * @constructor
         * @param {types.IMessageCreateBounty=} [properties] Properties to set
         */
        function MessageCreateBounty(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageCreateBounty signerAddress.
         * @member {Uint8Array} signerAddress
         * @memberof types.MessageCreateBounty
         * @instance
         */
        MessageCreateBounty.prototype.signerAddress = $util.newBuffer([]);

        /**
         * MessageCreateBounty title.
         * @member {string} title
         * @memberof types.MessageCreateBounty
         * @instance
         */
        MessageCreateBounty.prototype.title = "";

        /**
         * MessageCreateBounty description.
         * @member {string} description
         * @memberof types.MessageCreateBounty
         * @instance
         */
        MessageCreateBounty.prototype.description = "";

        /**
         * MessageCreateBounty reward.
         * @member {number|Long} reward
         * @memberof types.MessageCreateBounty
         * @instance
         */
        MessageCreateBounty.prototype.reward = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * MessageCreateBounty deadline.
         * @member {number|Long} deadline
         * @memberof types.MessageCreateBounty
         * @instance
         */
        MessageCreateBounty.prototype.deadline = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new MessageCreateBounty instance using the specified properties.
         * @function create
         * @memberof types.MessageCreateBounty
         * @static
         * @param {types.IMessageCreateBounty=} [properties] Properties to set
         * @returns {types.MessageCreateBounty} MessageCreateBounty instance
         */
        MessageCreateBounty.create = function create(properties) {
            return new MessageCreateBounty(properties);
        };

        /**
         * Encodes the specified MessageCreateBounty message. Does not implicitly {@link types.MessageCreateBounty.verify|verify} messages.
         * @function encode
         * @memberof types.MessageCreateBounty
         * @static
         * @param {types.IMessageCreateBounty} message MessageCreateBounty message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageCreateBounty.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.signerAddress != null && Object.hasOwnProperty.call(message, "signerAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.signerAddress);
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.title);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.description);
            if (message.reward != null && Object.hasOwnProperty.call(message, "reward"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.reward);
            if (message.deadline != null && Object.hasOwnProperty.call(message, "deadline"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.deadline);
            return writer;
        };

        /**
         * Encodes the specified MessageCreateBounty message, length delimited. Does not implicitly {@link types.MessageCreateBounty.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessageCreateBounty
         * @static
         * @param {types.IMessageCreateBounty} message MessageCreateBounty message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageCreateBounty.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a MessageCreateBounty message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessageCreateBounty
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessageCreateBounty} MessageCreateBounty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageCreateBounty.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessageCreateBounty();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.signerAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.title = reader.string();
                        break;
                    }
                case 3: {
                        message.description = reader.string();
                        break;
                    }
                case 4: {
                        message.reward = reader.uint64();
                        break;
                    }
                case 5: {
                        message.deadline = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageCreateBounty message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessageCreateBounty
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessageCreateBounty} MessageCreateBounty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageCreateBounty.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageCreateBounty message.
         * @function verify
         * @memberof types.MessageCreateBounty
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageCreateBounty.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.signerAddress != null && Object.hasOwnProperty.call(message, "signerAddress"))
                if (!(message.signerAddress && typeof message.signerAddress.length === "number" || $util.isString(message.signerAddress)))
                    return "signerAddress: buffer expected";
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                if (!$util.isString(message.title))
                    return "title: string expected";
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.reward != null && Object.hasOwnProperty.call(message, "reward"))
                if (!$util.isInteger(message.reward) && !(message.reward && $util.isInteger(message.reward.low) && $util.isInteger(message.reward.high)))
                    return "reward: integer|Long expected";
            if (message.deadline != null && Object.hasOwnProperty.call(message, "deadline"))
                if (!$util.isInteger(message.deadline) && !(message.deadline && $util.isInteger(message.deadline.low) && $util.isInteger(message.deadline.high)))
                    return "deadline: integer|Long expected";
            return null;
        };

        /**
         * Creates a MessageCreateBounty message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessageCreateBounty
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessageCreateBounty} MessageCreateBounty
         */
        MessageCreateBounty.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.MessageCreateBounty)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.MessageCreateBounty: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.MessageCreateBounty();
            if (object.signerAddress != null)
                if (typeof object.signerAddress === "string")
                    $util.base64.decode(object.signerAddress, message.signerAddress = $util.newBuffer($util.base64.length(object.signerAddress)), 0);
                else if (object.signerAddress.length >= 0)
                    message.signerAddress = object.signerAddress;
            if (object.title != null)
                message.title = String(object.title);
            if (object.description != null)
                message.description = String(object.description);
            if (object.reward != null)
                if ($util.Long)
                    message.reward = $util.Long.fromValue(object.reward, true);
                else if (typeof object.reward === "string")
                    message.reward = parseInt(object.reward, 10);
                else if (typeof object.reward === "number")
                    message.reward = object.reward;
                else if (typeof object.reward === "object")
                    message.reward = new $util.LongBits(object.reward.low >>> 0, object.reward.high >>> 0).toNumber(true);
            if (object.deadline != null)
                if ($util.Long)
                    message.deadline = $util.Long.fromValue(object.deadline, true);
                else if (typeof object.deadline === "string")
                    message.deadline = parseInt(object.deadline, 10);
                else if (typeof object.deadline === "number")
                    message.deadline = object.deadline;
                else if (typeof object.deadline === "object")
                    message.deadline = new $util.LongBits(object.deadline.low >>> 0, object.deadline.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a MessageCreateBounty message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessageCreateBounty
         * @static
         * @param {types.MessageCreateBounty} message MessageCreateBounty
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageCreateBounty.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.signerAddress = "";
                else {
                    object.signerAddress = [];
                    if (options.bytes !== Array)
                        object.signerAddress = $util.newBuffer(object.signerAddress);
                }
                object.title = "";
                object.description = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.reward = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.reward = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.deadline = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.deadline = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.signerAddress != null && Object.hasOwnProperty.call(message, "signerAddress"))
                object.signerAddress = options.bytes === String ? $util.base64.encode(message.signerAddress, 0, message.signerAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.signerAddress) : message.signerAddress;
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                object.title = message.title;
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                object.description = message.description;
            if (message.reward != null && Object.hasOwnProperty.call(message, "reward"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.reward = typeof message.reward === "number" ? BigInt(message.reward) : $util.Long.fromBits(message.reward.low >>> 0, message.reward.high >>> 0, true).toBigInt();
                else if (typeof message.reward === "number")
                    object.reward = options.longs === String ? String(message.reward) : message.reward;
                else
                    object.reward = options.longs === String ? $util.Long.prototype.toString.call(message.reward) : options.longs === Number ? new $util.LongBits(message.reward.low >>> 0, message.reward.high >>> 0).toNumber(true) : message.reward;
            if (message.deadline != null && Object.hasOwnProperty.call(message, "deadline"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.deadline = typeof message.deadline === "number" ? BigInt(message.deadline) : $util.Long.fromBits(message.deadline.low >>> 0, message.deadline.high >>> 0, true).toBigInt();
                else if (typeof message.deadline === "number")
                    object.deadline = options.longs === String ? String(message.deadline) : message.deadline;
                else
                    object.deadline = options.longs === String ? $util.Long.prototype.toString.call(message.deadline) : options.longs === Number ? new $util.LongBits(message.deadline.low >>> 0, message.deadline.high >>> 0).toNumber(true) : message.deadline;
            return object;
        };

        /**
         * Converts this MessageCreateBounty to JSON.
         * @function toJSON
         * @memberof types.MessageCreateBounty
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageCreateBounty.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageCreateBounty
         * @function getTypeUrl
         * @memberof types.MessageCreateBounty
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageCreateBounty.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessageCreateBounty";
        };

        return MessageCreateBounty;
    })();

    types.Bounty = (function() {

        /**
         * Properties of a Bounty.
         * @memberof types
         * @interface IBounty
         * @property {Uint8Array|null} [id] Bounty id
         * @property {Uint8Array|null} [creator] Bounty creator
         * @property {string|null} [title] Bounty title
         * @property {string|null} [description] Bounty description
         * @property {number|Long|null} [reward] Bounty reward
         * @property {number|Long|null} [deadline] Bounty deadline
         * @property {number|null} [status] Bounty status
         * @property {number|Long|null} [participantCount] Bounty participantCount
         * @property {number|Long|null} [submissionCount] Bounty submissionCount
         * @property {Uint8Array|null} [winner] Bounty winner
         * @property {number|Long|null} [createdAt] Bounty createdAt
         */

        /**
         * Constructs a new Bounty.
         * @memberof types
         * @classdesc Represents a Bounty.
         * @implements IBounty
         * @constructor
         * @param {types.IBounty=} [properties] Properties to set
         */
        function Bounty(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Bounty id.
         * @member {Uint8Array} id
         * @memberof types.Bounty
         * @instance
         */
        Bounty.prototype.id = $util.newBuffer([]);

        /**
         * Bounty creator.
         * @member {Uint8Array} creator
         * @memberof types.Bounty
         * @instance
         */
        Bounty.prototype.creator = $util.newBuffer([]);

        /**
         * Bounty title.
         * @member {string} title
         * @memberof types.Bounty
         * @instance
         */
        Bounty.prototype.title = "";

        /**
         * Bounty description.
         * @member {string} description
         * @memberof types.Bounty
         * @instance
         */
        Bounty.prototype.description = "";

        /**
         * Bounty reward.
         * @member {number|Long} reward
         * @memberof types.Bounty
         * @instance
         */
        Bounty.prototype.reward = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Bounty deadline.
         * @member {number|Long} deadline
         * @memberof types.Bounty
         * @instance
         */
        Bounty.prototype.deadline = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Bounty status.
         * @member {number} status
         * @memberof types.Bounty
         * @instance
         */
        Bounty.prototype.status = 0;

        /**
         * Bounty participantCount.
         * @member {number|Long} participantCount
         * @memberof types.Bounty
         * @instance
         */
        Bounty.prototype.participantCount = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Bounty submissionCount.
         * @member {number|Long} submissionCount
         * @memberof types.Bounty
         * @instance
         */
        Bounty.prototype.submissionCount = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Bounty winner.
         * @member {Uint8Array} winner
         * @memberof types.Bounty
         * @instance
         */
        Bounty.prototype.winner = $util.newBuffer([]);

        /**
         * Bounty createdAt.
         * @member {number|Long} createdAt
         * @memberof types.Bounty
         * @instance
         */
        Bounty.prototype.createdAt = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Bounty instance using the specified properties.
         * @function create
         * @memberof types.Bounty
         * @static
         * @param {types.IBounty=} [properties] Properties to set
         * @returns {types.Bounty} Bounty instance
         */
        Bounty.create = function create(properties) {
            return new Bounty(properties);
        };

        /**
         * Encodes the specified Bounty message. Does not implicitly {@link types.Bounty.verify|verify} messages.
         * @function encode
         * @memberof types.Bounty
         * @static
         * @param {types.IBounty} message Bounty message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Bounty.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.id);
            if (message.creator != null && Object.hasOwnProperty.call(message, "creator"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.creator);
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.title);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.description);
            if (message.reward != null && Object.hasOwnProperty.call(message, "reward"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.reward);
            if (message.deadline != null && Object.hasOwnProperty.call(message, "deadline"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.deadline);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.status);
            if (message.participantCount != null && Object.hasOwnProperty.call(message, "participantCount"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.participantCount);
            if (message.submissionCount != null && Object.hasOwnProperty.call(message, "submissionCount"))
                writer.uint32(/* id 9, wireType 0 =*/72).uint64(message.submissionCount);
            if (message.winner != null && Object.hasOwnProperty.call(message, "winner"))
                writer.uint32(/* id 10, wireType 2 =*/82).bytes(message.winner);
            if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
                writer.uint32(/* id 11, wireType 0 =*/88).uint64(message.createdAt);
            return writer;
        };

        /**
         * Encodes the specified Bounty message, length delimited. Does not implicitly {@link types.Bounty.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Bounty
         * @static
         * @param {types.IBounty} message Bounty message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Bounty.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Bounty message from the specified reader or buffer.
         * @function decode
         * @memberof types.Bounty
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Bounty} Bounty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Bounty.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Bounty();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.bytes();
                        break;
                    }
                case 2: {
                        message.creator = reader.bytes();
                        break;
                    }
                case 3: {
                        message.title = reader.string();
                        break;
                    }
                case 4: {
                        message.description = reader.string();
                        break;
                    }
                case 5: {
                        message.reward = reader.uint64();
                        break;
                    }
                case 6: {
                        message.deadline = reader.uint64();
                        break;
                    }
                case 7: {
                        message.status = reader.uint32();
                        break;
                    }
                case 8: {
                        message.participantCount = reader.uint64();
                        break;
                    }
                case 9: {
                        message.submissionCount = reader.uint64();
                        break;
                    }
                case 10: {
                        message.winner = reader.bytes();
                        break;
                    }
                case 11: {
                        message.createdAt = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Bounty message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Bounty
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Bounty} Bounty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Bounty.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Bounty message.
         * @function verify
         * @memberof types.Bounty
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Bounty.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                if (!(message.id && typeof message.id.length === "number" || $util.isString(message.id)))
                    return "id: buffer expected";
            if (message.creator != null && Object.hasOwnProperty.call(message, "creator"))
                if (!(message.creator && typeof message.creator.length === "number" || $util.isString(message.creator)))
                    return "creator: buffer expected";
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                if (!$util.isString(message.title))
                    return "title: string expected";
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.reward != null && Object.hasOwnProperty.call(message, "reward"))
                if (!$util.isInteger(message.reward) && !(message.reward && $util.isInteger(message.reward.low) && $util.isInteger(message.reward.high)))
                    return "reward: integer|Long expected";
            if (message.deadline != null && Object.hasOwnProperty.call(message, "deadline"))
                if (!$util.isInteger(message.deadline) && !(message.deadline && $util.isInteger(message.deadline.low) && $util.isInteger(message.deadline.high)))
                    return "deadline: integer|Long expected";
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                if (!$util.isInteger(message.status))
                    return "status: integer expected";
            if (message.participantCount != null && Object.hasOwnProperty.call(message, "participantCount"))
                if (!$util.isInteger(message.participantCount) && !(message.participantCount && $util.isInteger(message.participantCount.low) && $util.isInteger(message.participantCount.high)))
                    return "participantCount: integer|Long expected";
            if (message.submissionCount != null && Object.hasOwnProperty.call(message, "submissionCount"))
                if (!$util.isInteger(message.submissionCount) && !(message.submissionCount && $util.isInteger(message.submissionCount.low) && $util.isInteger(message.submissionCount.high)))
                    return "submissionCount: integer|Long expected";
            if (message.winner != null && Object.hasOwnProperty.call(message, "winner"))
                if (!(message.winner && typeof message.winner.length === "number" || $util.isString(message.winner)))
                    return "winner: buffer expected";
            if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
                if (!$util.isInteger(message.createdAt) && !(message.createdAt && $util.isInteger(message.createdAt.low) && $util.isInteger(message.createdAt.high)))
                    return "createdAt: integer|Long expected";
            return null;
        };

        /**
         * Creates a Bounty message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Bounty
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Bounty} Bounty
         */
        Bounty.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.Bounty)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.Bounty: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.Bounty();
            if (object.id != null)
                if (typeof object.id === "string")
                    $util.base64.decode(object.id, message.id = $util.newBuffer($util.base64.length(object.id)), 0);
                else if (object.id.length >= 0)
                    message.id = object.id;
            if (object.creator != null)
                if (typeof object.creator === "string")
                    $util.base64.decode(object.creator, message.creator = $util.newBuffer($util.base64.length(object.creator)), 0);
                else if (object.creator.length >= 0)
                    message.creator = object.creator;
            if (object.title != null)
                message.title = String(object.title);
            if (object.description != null)
                message.description = String(object.description);
            if (object.reward != null)
                if ($util.Long)
                    message.reward = $util.Long.fromValue(object.reward, true);
                else if (typeof object.reward === "string")
                    message.reward = parseInt(object.reward, 10);
                else if (typeof object.reward === "number")
                    message.reward = object.reward;
                else if (typeof object.reward === "object")
                    message.reward = new $util.LongBits(object.reward.low >>> 0, object.reward.high >>> 0).toNumber(true);
            if (object.deadline != null)
                if ($util.Long)
                    message.deadline = $util.Long.fromValue(object.deadline, true);
                else if (typeof object.deadline === "string")
                    message.deadline = parseInt(object.deadline, 10);
                else if (typeof object.deadline === "number")
                    message.deadline = object.deadline;
                else if (typeof object.deadline === "object")
                    message.deadline = new $util.LongBits(object.deadline.low >>> 0, object.deadline.high >>> 0).toNumber(true);
            if (object.status != null)
                message.status = object.status >>> 0;
            if (object.participantCount != null)
                if ($util.Long)
                    message.participantCount = $util.Long.fromValue(object.participantCount, true);
                else if (typeof object.participantCount === "string")
                    message.participantCount = parseInt(object.participantCount, 10);
                else if (typeof object.participantCount === "number")
                    message.participantCount = object.participantCount;
                else if (typeof object.participantCount === "object")
                    message.participantCount = new $util.LongBits(object.participantCount.low >>> 0, object.participantCount.high >>> 0).toNumber(true);
            if (object.submissionCount != null)
                if ($util.Long)
                    message.submissionCount = $util.Long.fromValue(object.submissionCount, true);
                else if (typeof object.submissionCount === "string")
                    message.submissionCount = parseInt(object.submissionCount, 10);
                else if (typeof object.submissionCount === "number")
                    message.submissionCount = object.submissionCount;
                else if (typeof object.submissionCount === "object")
                    message.submissionCount = new $util.LongBits(object.submissionCount.low >>> 0, object.submissionCount.high >>> 0).toNumber(true);
            if (object.winner != null)
                if (typeof object.winner === "string")
                    $util.base64.decode(object.winner, message.winner = $util.newBuffer($util.base64.length(object.winner)), 0);
                else if (object.winner.length >= 0)
                    message.winner = object.winner;
            if (object.createdAt != null)
                if ($util.Long)
                    message.createdAt = $util.Long.fromValue(object.createdAt, true);
                else if (typeof object.createdAt === "string")
                    message.createdAt = parseInt(object.createdAt, 10);
                else if (typeof object.createdAt === "number")
                    message.createdAt = object.createdAt;
                else if (typeof object.createdAt === "object")
                    message.createdAt = new $util.LongBits(object.createdAt.low >>> 0, object.createdAt.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Bounty message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Bounty
         * @static
         * @param {types.Bounty} message Bounty
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Bounty.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.id = "";
                else {
                    object.id = [];
                    if (options.bytes !== Array)
                        object.id = $util.newBuffer(object.id);
                }
                if (options.bytes === String)
                    object.creator = "";
                else {
                    object.creator = [];
                    if (options.bytes !== Array)
                        object.creator = $util.newBuffer(object.creator);
                }
                object.title = "";
                object.description = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.reward = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.reward = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.deadline = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.deadline = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.status = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.participantCount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.participantCount = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.submissionCount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.submissionCount = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.winner = "";
                else {
                    object.winner = [];
                    if (options.bytes !== Array)
                        object.winner = $util.newBuffer(object.winner);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.createdAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.createdAt = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                object.id = options.bytes === String ? $util.base64.encode(message.id, 0, message.id.length) : options.bytes === Array ? Array.prototype.slice.call(message.id) : message.id;
            if (message.creator != null && Object.hasOwnProperty.call(message, "creator"))
                object.creator = options.bytes === String ? $util.base64.encode(message.creator, 0, message.creator.length) : options.bytes === Array ? Array.prototype.slice.call(message.creator) : message.creator;
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                object.title = message.title;
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                object.description = message.description;
            if (message.reward != null && Object.hasOwnProperty.call(message, "reward"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.reward = typeof message.reward === "number" ? BigInt(message.reward) : $util.Long.fromBits(message.reward.low >>> 0, message.reward.high >>> 0, true).toBigInt();
                else if (typeof message.reward === "number")
                    object.reward = options.longs === String ? String(message.reward) : message.reward;
                else
                    object.reward = options.longs === String ? $util.Long.prototype.toString.call(message.reward) : options.longs === Number ? new $util.LongBits(message.reward.low >>> 0, message.reward.high >>> 0).toNumber(true) : message.reward;
            if (message.deadline != null && Object.hasOwnProperty.call(message, "deadline"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.deadline = typeof message.deadline === "number" ? BigInt(message.deadline) : $util.Long.fromBits(message.deadline.low >>> 0, message.deadline.high >>> 0, true).toBigInt();
                else if (typeof message.deadline === "number")
                    object.deadline = options.longs === String ? String(message.deadline) : message.deadline;
                else
                    object.deadline = options.longs === String ? $util.Long.prototype.toString.call(message.deadline) : options.longs === Number ? new $util.LongBits(message.deadline.low >>> 0, message.deadline.high >>> 0).toNumber(true) : message.deadline;
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                object.status = message.status;
            if (message.participantCount != null && Object.hasOwnProperty.call(message, "participantCount"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.participantCount = typeof message.participantCount === "number" ? BigInt(message.participantCount) : $util.Long.fromBits(message.participantCount.low >>> 0, message.participantCount.high >>> 0, true).toBigInt();
                else if (typeof message.participantCount === "number")
                    object.participantCount = options.longs === String ? String(message.participantCount) : message.participantCount;
                else
                    object.participantCount = options.longs === String ? $util.Long.prototype.toString.call(message.participantCount) : options.longs === Number ? new $util.LongBits(message.participantCount.low >>> 0, message.participantCount.high >>> 0).toNumber(true) : message.participantCount;
            if (message.submissionCount != null && Object.hasOwnProperty.call(message, "submissionCount"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.submissionCount = typeof message.submissionCount === "number" ? BigInt(message.submissionCount) : $util.Long.fromBits(message.submissionCount.low >>> 0, message.submissionCount.high >>> 0, true).toBigInt();
                else if (typeof message.submissionCount === "number")
                    object.submissionCount = options.longs === String ? String(message.submissionCount) : message.submissionCount;
                else
                    object.submissionCount = options.longs === String ? $util.Long.prototype.toString.call(message.submissionCount) : options.longs === Number ? new $util.LongBits(message.submissionCount.low >>> 0, message.submissionCount.high >>> 0).toNumber(true) : message.submissionCount;
            if (message.winner != null && Object.hasOwnProperty.call(message, "winner"))
                object.winner = options.bytes === String ? $util.base64.encode(message.winner, 0, message.winner.length) : options.bytes === Array ? Array.prototype.slice.call(message.winner) : message.winner;
            if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.createdAt = typeof message.createdAt === "number" ? BigInt(message.createdAt) : $util.Long.fromBits(message.createdAt.low >>> 0, message.createdAt.high >>> 0, true).toBigInt();
                else if (typeof message.createdAt === "number")
                    object.createdAt = options.longs === String ? String(message.createdAt) : message.createdAt;
                else
                    object.createdAt = options.longs === String ? $util.Long.prototype.toString.call(message.createdAt) : options.longs === Number ? new $util.LongBits(message.createdAt.low >>> 0, message.createdAt.high >>> 0).toNumber(true) : message.createdAt;
            return object;
        };

        /**
         * Converts this Bounty to JSON.
         * @function toJSON
         * @memberof types.Bounty
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Bounty.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Bounty
         * @function getTypeUrl
         * @memberof types.Bounty
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Bounty.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Bounty";
        };

        return Bounty;
    })();

    types.MessageJoinBounty = (function() {

        /**
         * Properties of a MessageJoinBounty.
         * @memberof types
         * @interface IMessageJoinBounty
         * @property {Uint8Array|null} [signerAddress] MessageJoinBounty signerAddress
         * @property {Uint8Array|null} [bountyId] MessageJoinBounty bountyId
         */

        /**
         * Constructs a new MessageJoinBounty.
         * @memberof types
         * @classdesc Represents a MessageJoinBounty.
         * @implements IMessageJoinBounty
         * @constructor
         * @param {types.IMessageJoinBounty=} [properties] Properties to set
         */
        function MessageJoinBounty(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageJoinBounty signerAddress.
         * @member {Uint8Array} signerAddress
         * @memberof types.MessageJoinBounty
         * @instance
         */
        MessageJoinBounty.prototype.signerAddress = $util.newBuffer([]);

        /**
         * MessageJoinBounty bountyId.
         * @member {Uint8Array} bountyId
         * @memberof types.MessageJoinBounty
         * @instance
         */
        MessageJoinBounty.prototype.bountyId = $util.newBuffer([]);

        /**
         * Creates a new MessageJoinBounty instance using the specified properties.
         * @function create
         * @memberof types.MessageJoinBounty
         * @static
         * @param {types.IMessageJoinBounty=} [properties] Properties to set
         * @returns {types.MessageJoinBounty} MessageJoinBounty instance
         */
        MessageJoinBounty.create = function create(properties) {
            return new MessageJoinBounty(properties);
        };

        /**
         * Encodes the specified MessageJoinBounty message. Does not implicitly {@link types.MessageJoinBounty.verify|verify} messages.
         * @function encode
         * @memberof types.MessageJoinBounty
         * @static
         * @param {types.IMessageJoinBounty} message MessageJoinBounty message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageJoinBounty.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.signerAddress != null && Object.hasOwnProperty.call(message, "signerAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.signerAddress);
            if (message.bountyId != null && Object.hasOwnProperty.call(message, "bountyId"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.bountyId);
            return writer;
        };

        /**
         * Encodes the specified MessageJoinBounty message, length delimited. Does not implicitly {@link types.MessageJoinBounty.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessageJoinBounty
         * @static
         * @param {types.IMessageJoinBounty} message MessageJoinBounty message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageJoinBounty.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a MessageJoinBounty message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessageJoinBounty
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessageJoinBounty} MessageJoinBounty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageJoinBounty.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessageJoinBounty();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.signerAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.bountyId = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageJoinBounty message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessageJoinBounty
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessageJoinBounty} MessageJoinBounty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageJoinBounty.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageJoinBounty message.
         * @function verify
         * @memberof types.MessageJoinBounty
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageJoinBounty.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.signerAddress != null && Object.hasOwnProperty.call(message, "signerAddress"))
                if (!(message.signerAddress && typeof message.signerAddress.length === "number" || $util.isString(message.signerAddress)))
                    return "signerAddress: buffer expected";
            if (message.bountyId != null && Object.hasOwnProperty.call(message, "bountyId"))
                if (!(message.bountyId && typeof message.bountyId.length === "number" || $util.isString(message.bountyId)))
                    return "bountyId: buffer expected";
            return null;
        };

        /**
         * Creates a MessageJoinBounty message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessageJoinBounty
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessageJoinBounty} MessageJoinBounty
         */
        MessageJoinBounty.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.MessageJoinBounty)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.MessageJoinBounty: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.MessageJoinBounty();
            if (object.signerAddress != null)
                if (typeof object.signerAddress === "string")
                    $util.base64.decode(object.signerAddress, message.signerAddress = $util.newBuffer($util.base64.length(object.signerAddress)), 0);
                else if (object.signerAddress.length >= 0)
                    message.signerAddress = object.signerAddress;
            if (object.bountyId != null)
                if (typeof object.bountyId === "string")
                    $util.base64.decode(object.bountyId, message.bountyId = $util.newBuffer($util.base64.length(object.bountyId)), 0);
                else if (object.bountyId.length >= 0)
                    message.bountyId = object.bountyId;
            return message;
        };

        /**
         * Creates a plain object from a MessageJoinBounty message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessageJoinBounty
         * @static
         * @param {types.MessageJoinBounty} message MessageJoinBounty
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageJoinBounty.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.signerAddress = "";
                else {
                    object.signerAddress = [];
                    if (options.bytes !== Array)
                        object.signerAddress = $util.newBuffer(object.signerAddress);
                }
                if (options.bytes === String)
                    object.bountyId = "";
                else {
                    object.bountyId = [];
                    if (options.bytes !== Array)
                        object.bountyId = $util.newBuffer(object.bountyId);
                }
            }
            if (message.signerAddress != null && Object.hasOwnProperty.call(message, "signerAddress"))
                object.signerAddress = options.bytes === String ? $util.base64.encode(message.signerAddress, 0, message.signerAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.signerAddress) : message.signerAddress;
            if (message.bountyId != null && Object.hasOwnProperty.call(message, "bountyId"))
                object.bountyId = options.bytes === String ? $util.base64.encode(message.bountyId, 0, message.bountyId.length) : options.bytes === Array ? Array.prototype.slice.call(message.bountyId) : message.bountyId;
            return object;
        };

        /**
         * Converts this MessageJoinBounty to JSON.
         * @function toJSON
         * @memberof types.MessageJoinBounty
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageJoinBounty.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageJoinBounty
         * @function getTypeUrl
         * @memberof types.MessageJoinBounty
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageJoinBounty.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessageJoinBounty";
        };

        return MessageJoinBounty;
    })();

    types.Participant = (function() {

        /**
         * Properties of a Participant.
         * @memberof types
         * @interface IParticipant
         * @property {Uint8Array|null} [bountyId] Participant bountyId
         * @property {Uint8Array|null} [address] Participant address
         * @property {number|Long|null} [joinedAt] Participant joinedAt
         */

        /**
         * Constructs a new Participant.
         * @memberof types
         * @classdesc Represents a Participant.
         * @implements IParticipant
         * @constructor
         * @param {types.IParticipant=} [properties] Properties to set
         */
        function Participant(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Participant bountyId.
         * @member {Uint8Array} bountyId
         * @memberof types.Participant
         * @instance
         */
        Participant.prototype.bountyId = $util.newBuffer([]);

        /**
         * Participant address.
         * @member {Uint8Array} address
         * @memberof types.Participant
         * @instance
         */
        Participant.prototype.address = $util.newBuffer([]);

        /**
         * Participant joinedAt.
         * @member {number|Long} joinedAt
         * @memberof types.Participant
         * @instance
         */
        Participant.prototype.joinedAt = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Participant instance using the specified properties.
         * @function create
         * @memberof types.Participant
         * @static
         * @param {types.IParticipant=} [properties] Properties to set
         * @returns {types.Participant} Participant instance
         */
        Participant.create = function create(properties) {
            return new Participant(properties);
        };

        /**
         * Encodes the specified Participant message. Does not implicitly {@link types.Participant.verify|verify} messages.
         * @function encode
         * @memberof types.Participant
         * @static
         * @param {types.IParticipant} message Participant message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Participant.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.bountyId != null && Object.hasOwnProperty.call(message, "bountyId"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.bountyId);
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.address);
            if (message.joinedAt != null && Object.hasOwnProperty.call(message, "joinedAt"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.joinedAt);
            return writer;
        };

        /**
         * Encodes the specified Participant message, length delimited. Does not implicitly {@link types.Participant.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Participant
         * @static
         * @param {types.IParticipant} message Participant message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Participant.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Participant message from the specified reader or buffer.
         * @function decode
         * @memberof types.Participant
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Participant} Participant
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Participant.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Participant();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.bountyId = reader.bytes();
                        break;
                    }
                case 2: {
                        message.address = reader.bytes();
                        break;
                    }
                case 3: {
                        message.joinedAt = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Participant message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Participant
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Participant} Participant
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Participant.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Participant message.
         * @function verify
         * @memberof types.Participant
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Participant.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.bountyId != null && Object.hasOwnProperty.call(message, "bountyId"))
                if (!(message.bountyId && typeof message.bountyId.length === "number" || $util.isString(message.bountyId)))
                    return "bountyId: buffer expected";
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                if (!(message.address && typeof message.address.length === "number" || $util.isString(message.address)))
                    return "address: buffer expected";
            if (message.joinedAt != null && Object.hasOwnProperty.call(message, "joinedAt"))
                if (!$util.isInteger(message.joinedAt) && !(message.joinedAt && $util.isInteger(message.joinedAt.low) && $util.isInteger(message.joinedAt.high)))
                    return "joinedAt: integer|Long expected";
            return null;
        };

        /**
         * Creates a Participant message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Participant
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Participant} Participant
         */
        Participant.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.Participant)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.Participant: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.Participant();
            if (object.bountyId != null)
                if (typeof object.bountyId === "string")
                    $util.base64.decode(object.bountyId, message.bountyId = $util.newBuffer($util.base64.length(object.bountyId)), 0);
                else if (object.bountyId.length >= 0)
                    message.bountyId = object.bountyId;
            if (object.address != null)
                if (typeof object.address === "string")
                    $util.base64.decode(object.address, message.address = $util.newBuffer($util.base64.length(object.address)), 0);
                else if (object.address.length >= 0)
                    message.address = object.address;
            if (object.joinedAt != null)
                if ($util.Long)
                    message.joinedAt = $util.Long.fromValue(object.joinedAt, true);
                else if (typeof object.joinedAt === "string")
                    message.joinedAt = parseInt(object.joinedAt, 10);
                else if (typeof object.joinedAt === "number")
                    message.joinedAt = object.joinedAt;
                else if (typeof object.joinedAt === "object")
                    message.joinedAt = new $util.LongBits(object.joinedAt.low >>> 0, object.joinedAt.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Participant message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Participant
         * @static
         * @param {types.Participant} message Participant
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Participant.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.bountyId = "";
                else {
                    object.bountyId = [];
                    if (options.bytes !== Array)
                        object.bountyId = $util.newBuffer(object.bountyId);
                }
                if (options.bytes === String)
                    object.address = "";
                else {
                    object.address = [];
                    if (options.bytes !== Array)
                        object.address = $util.newBuffer(object.address);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.joinedAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.joinedAt = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.bountyId != null && Object.hasOwnProperty.call(message, "bountyId"))
                object.bountyId = options.bytes === String ? $util.base64.encode(message.bountyId, 0, message.bountyId.length) : options.bytes === Array ? Array.prototype.slice.call(message.bountyId) : message.bountyId;
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                object.address = options.bytes === String ? $util.base64.encode(message.address, 0, message.address.length) : options.bytes === Array ? Array.prototype.slice.call(message.address) : message.address;
            if (message.joinedAt != null && Object.hasOwnProperty.call(message, "joinedAt"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.joinedAt = typeof message.joinedAt === "number" ? BigInt(message.joinedAt) : $util.Long.fromBits(message.joinedAt.low >>> 0, message.joinedAt.high >>> 0, true).toBigInt();
                else if (typeof message.joinedAt === "number")
                    object.joinedAt = options.longs === String ? String(message.joinedAt) : message.joinedAt;
                else
                    object.joinedAt = options.longs === String ? $util.Long.prototype.toString.call(message.joinedAt) : options.longs === Number ? new $util.LongBits(message.joinedAt.low >>> 0, message.joinedAt.high >>> 0).toNumber(true) : message.joinedAt;
            return object;
        };

        /**
         * Converts this Participant to JSON.
         * @function toJSON
         * @memberof types.Participant
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Participant.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Participant
         * @function getTypeUrl
         * @memberof types.Participant
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Participant.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Participant";
        };

        return Participant;
    })();

    types.MessageSubmitWork = (function() {

        /**
         * Properties of a MessageSubmitWork.
         * @memberof types
         * @interface IMessageSubmitWork
         * @property {Uint8Array|null} [signerAddress] MessageSubmitWork signerAddress
         * @property {Uint8Array|null} [bountyId] MessageSubmitWork bountyId
         * @property {string|null} [description] MessageSubmitWork description
         * @property {string|null} [repoUrl] MessageSubmitWork repoUrl
         * @property {string|null} [demoUrl] MessageSubmitWork demoUrl
         */

        /**
         * Constructs a new MessageSubmitWork.
         * @memberof types
         * @classdesc Represents a MessageSubmitWork.
         * @implements IMessageSubmitWork
         * @constructor
         * @param {types.IMessageSubmitWork=} [properties] Properties to set
         */
        function MessageSubmitWork(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageSubmitWork signerAddress.
         * @member {Uint8Array} signerAddress
         * @memberof types.MessageSubmitWork
         * @instance
         */
        MessageSubmitWork.prototype.signerAddress = $util.newBuffer([]);

        /**
         * MessageSubmitWork bountyId.
         * @member {Uint8Array} bountyId
         * @memberof types.MessageSubmitWork
         * @instance
         */
        MessageSubmitWork.prototype.bountyId = $util.newBuffer([]);

        /**
         * MessageSubmitWork description.
         * @member {string} description
         * @memberof types.MessageSubmitWork
         * @instance
         */
        MessageSubmitWork.prototype.description = "";

        /**
         * MessageSubmitWork repoUrl.
         * @member {string} repoUrl
         * @memberof types.MessageSubmitWork
         * @instance
         */
        MessageSubmitWork.prototype.repoUrl = "";

        /**
         * MessageSubmitWork demoUrl.
         * @member {string} demoUrl
         * @memberof types.MessageSubmitWork
         * @instance
         */
        MessageSubmitWork.prototype.demoUrl = "";

        /**
         * Creates a new MessageSubmitWork instance using the specified properties.
         * @function create
         * @memberof types.MessageSubmitWork
         * @static
         * @param {types.IMessageSubmitWork=} [properties] Properties to set
         * @returns {types.MessageSubmitWork} MessageSubmitWork instance
         */
        MessageSubmitWork.create = function create(properties) {
            return new MessageSubmitWork(properties);
        };

        /**
         * Encodes the specified MessageSubmitWork message. Does not implicitly {@link types.MessageSubmitWork.verify|verify} messages.
         * @function encode
         * @memberof types.MessageSubmitWork
         * @static
         * @param {types.IMessageSubmitWork} message MessageSubmitWork message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageSubmitWork.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.signerAddress != null && Object.hasOwnProperty.call(message, "signerAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.signerAddress);
            if (message.bountyId != null && Object.hasOwnProperty.call(message, "bountyId"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.bountyId);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.description);
            if (message.repoUrl != null && Object.hasOwnProperty.call(message, "repoUrl"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.repoUrl);
            if (message.demoUrl != null && Object.hasOwnProperty.call(message, "demoUrl"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.demoUrl);
            return writer;
        };

        /**
         * Encodes the specified MessageSubmitWork message, length delimited. Does not implicitly {@link types.MessageSubmitWork.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessageSubmitWork
         * @static
         * @param {types.IMessageSubmitWork} message MessageSubmitWork message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageSubmitWork.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a MessageSubmitWork message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessageSubmitWork
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessageSubmitWork} MessageSubmitWork
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageSubmitWork.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessageSubmitWork();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.signerAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.bountyId = reader.bytes();
                        break;
                    }
                case 3: {
                        message.description = reader.string();
                        break;
                    }
                case 4: {
                        message.repoUrl = reader.string();
                        break;
                    }
                case 5: {
                        message.demoUrl = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageSubmitWork message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessageSubmitWork
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessageSubmitWork} MessageSubmitWork
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageSubmitWork.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageSubmitWork message.
         * @function verify
         * @memberof types.MessageSubmitWork
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageSubmitWork.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.signerAddress != null && Object.hasOwnProperty.call(message, "signerAddress"))
                if (!(message.signerAddress && typeof message.signerAddress.length === "number" || $util.isString(message.signerAddress)))
                    return "signerAddress: buffer expected";
            if (message.bountyId != null && Object.hasOwnProperty.call(message, "bountyId"))
                if (!(message.bountyId && typeof message.bountyId.length === "number" || $util.isString(message.bountyId)))
                    return "bountyId: buffer expected";
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.repoUrl != null && Object.hasOwnProperty.call(message, "repoUrl"))
                if (!$util.isString(message.repoUrl))
                    return "repoUrl: string expected";
            if (message.demoUrl != null && Object.hasOwnProperty.call(message, "demoUrl"))
                if (!$util.isString(message.demoUrl))
                    return "demoUrl: string expected";
            return null;
        };

        /**
         * Creates a MessageSubmitWork message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessageSubmitWork
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessageSubmitWork} MessageSubmitWork
         */
        MessageSubmitWork.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.MessageSubmitWork)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.MessageSubmitWork: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.MessageSubmitWork();
            if (object.signerAddress != null)
                if (typeof object.signerAddress === "string")
                    $util.base64.decode(object.signerAddress, message.signerAddress = $util.newBuffer($util.base64.length(object.signerAddress)), 0);
                else if (object.signerAddress.length >= 0)
                    message.signerAddress = object.signerAddress;
            if (object.bountyId != null)
                if (typeof object.bountyId === "string")
                    $util.base64.decode(object.bountyId, message.bountyId = $util.newBuffer($util.base64.length(object.bountyId)), 0);
                else if (object.bountyId.length >= 0)
                    message.bountyId = object.bountyId;
            if (object.description != null)
                message.description = String(object.description);
            if (object.repoUrl != null)
                message.repoUrl = String(object.repoUrl);
            if (object.demoUrl != null)
                message.demoUrl = String(object.demoUrl);
            return message;
        };

        /**
         * Creates a plain object from a MessageSubmitWork message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessageSubmitWork
         * @static
         * @param {types.MessageSubmitWork} message MessageSubmitWork
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageSubmitWork.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.signerAddress = "";
                else {
                    object.signerAddress = [];
                    if (options.bytes !== Array)
                        object.signerAddress = $util.newBuffer(object.signerAddress);
                }
                if (options.bytes === String)
                    object.bountyId = "";
                else {
                    object.bountyId = [];
                    if (options.bytes !== Array)
                        object.bountyId = $util.newBuffer(object.bountyId);
                }
                object.description = "";
                object.repoUrl = "";
                object.demoUrl = "";
            }
            if (message.signerAddress != null && Object.hasOwnProperty.call(message, "signerAddress"))
                object.signerAddress = options.bytes === String ? $util.base64.encode(message.signerAddress, 0, message.signerAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.signerAddress) : message.signerAddress;
            if (message.bountyId != null && Object.hasOwnProperty.call(message, "bountyId"))
                object.bountyId = options.bytes === String ? $util.base64.encode(message.bountyId, 0, message.bountyId.length) : options.bytes === Array ? Array.prototype.slice.call(message.bountyId) : message.bountyId;
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                object.description = message.description;
            if (message.repoUrl != null && Object.hasOwnProperty.call(message, "repoUrl"))
                object.repoUrl = message.repoUrl;
            if (message.demoUrl != null && Object.hasOwnProperty.call(message, "demoUrl"))
                object.demoUrl = message.demoUrl;
            return object;
        };

        /**
         * Converts this MessageSubmitWork to JSON.
         * @function toJSON
         * @memberof types.MessageSubmitWork
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageSubmitWork.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageSubmitWork
         * @function getTypeUrl
         * @memberof types.MessageSubmitWork
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageSubmitWork.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessageSubmitWork";
        };

        return MessageSubmitWork;
    })();

    types.Submission = (function() {

        /**
         * Properties of a Submission.
         * @memberof types
         * @interface ISubmission
         * @property {Uint8Array|null} [bountyId] Submission bountyId
         * @property {Uint8Array|null} [submitter] Submission submitter
         * @property {string|null} [description] Submission description
         * @property {string|null} [repoUrl] Submission repoUrl
         * @property {string|null} [demoUrl] Submission demoUrl
         * @property {number|Long|null} [submittedAt] Submission submittedAt
         * @property {number|Long|null} [updatedAt] Submission updatedAt
         */

        /**
         * Constructs a new Submission.
         * @memberof types
         * @classdesc Represents a Submission.
         * @implements ISubmission
         * @constructor
         * @param {types.ISubmission=} [properties] Properties to set
         */
        function Submission(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Submission bountyId.
         * @member {Uint8Array} bountyId
         * @memberof types.Submission
         * @instance
         */
        Submission.prototype.bountyId = $util.newBuffer([]);

        /**
         * Submission submitter.
         * @member {Uint8Array} submitter
         * @memberof types.Submission
         * @instance
         */
        Submission.prototype.submitter = $util.newBuffer([]);

        /**
         * Submission description.
         * @member {string} description
         * @memberof types.Submission
         * @instance
         */
        Submission.prototype.description = "";

        /**
         * Submission repoUrl.
         * @member {string} repoUrl
         * @memberof types.Submission
         * @instance
         */
        Submission.prototype.repoUrl = "";

        /**
         * Submission demoUrl.
         * @member {string} demoUrl
         * @memberof types.Submission
         * @instance
         */
        Submission.prototype.demoUrl = "";

        /**
         * Submission submittedAt.
         * @member {number|Long} submittedAt
         * @memberof types.Submission
         * @instance
         */
        Submission.prototype.submittedAt = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Submission updatedAt.
         * @member {number|Long} updatedAt
         * @memberof types.Submission
         * @instance
         */
        Submission.prototype.updatedAt = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Submission instance using the specified properties.
         * @function create
         * @memberof types.Submission
         * @static
         * @param {types.ISubmission=} [properties] Properties to set
         * @returns {types.Submission} Submission instance
         */
        Submission.create = function create(properties) {
            return new Submission(properties);
        };

        /**
         * Encodes the specified Submission message. Does not implicitly {@link types.Submission.verify|verify} messages.
         * @function encode
         * @memberof types.Submission
         * @static
         * @param {types.ISubmission} message Submission message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Submission.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.bountyId != null && Object.hasOwnProperty.call(message, "bountyId"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.bountyId);
            if (message.submitter != null && Object.hasOwnProperty.call(message, "submitter"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.submitter);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.description);
            if (message.repoUrl != null && Object.hasOwnProperty.call(message, "repoUrl"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.repoUrl);
            if (message.demoUrl != null && Object.hasOwnProperty.call(message, "demoUrl"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.demoUrl);
            if (message.submittedAt != null && Object.hasOwnProperty.call(message, "submittedAt"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.submittedAt);
            if (message.updatedAt != null && Object.hasOwnProperty.call(message, "updatedAt"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.updatedAt);
            return writer;
        };

        /**
         * Encodes the specified Submission message, length delimited. Does not implicitly {@link types.Submission.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Submission
         * @static
         * @param {types.ISubmission} message Submission message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Submission.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Submission message from the specified reader or buffer.
         * @function decode
         * @memberof types.Submission
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Submission} Submission
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Submission.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Submission();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.bountyId = reader.bytes();
                        break;
                    }
                case 2: {
                        message.submitter = reader.bytes();
                        break;
                    }
                case 3: {
                        message.description = reader.string();
                        break;
                    }
                case 4: {
                        message.repoUrl = reader.string();
                        break;
                    }
                case 5: {
                        message.demoUrl = reader.string();
                        break;
                    }
                case 6: {
                        message.submittedAt = reader.uint64();
                        break;
                    }
                case 7: {
                        message.updatedAt = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Submission message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Submission
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Submission} Submission
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Submission.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Submission message.
         * @function verify
         * @memberof types.Submission
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Submission.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.bountyId != null && Object.hasOwnProperty.call(message, "bountyId"))
                if (!(message.bountyId && typeof message.bountyId.length === "number" || $util.isString(message.bountyId)))
                    return "bountyId: buffer expected";
            if (message.submitter != null && Object.hasOwnProperty.call(message, "submitter"))
                if (!(message.submitter && typeof message.submitter.length === "number" || $util.isString(message.submitter)))
                    return "submitter: buffer expected";
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.repoUrl != null && Object.hasOwnProperty.call(message, "repoUrl"))
                if (!$util.isString(message.repoUrl))
                    return "repoUrl: string expected";
            if (message.demoUrl != null && Object.hasOwnProperty.call(message, "demoUrl"))
                if (!$util.isString(message.demoUrl))
                    return "demoUrl: string expected";
            if (message.submittedAt != null && Object.hasOwnProperty.call(message, "submittedAt"))
                if (!$util.isInteger(message.submittedAt) && !(message.submittedAt && $util.isInteger(message.submittedAt.low) && $util.isInteger(message.submittedAt.high)))
                    return "submittedAt: integer|Long expected";
            if (message.updatedAt != null && Object.hasOwnProperty.call(message, "updatedAt"))
                if (!$util.isInteger(message.updatedAt) && !(message.updatedAt && $util.isInteger(message.updatedAt.low) && $util.isInteger(message.updatedAt.high)))
                    return "updatedAt: integer|Long expected";
            return null;
        };

        /**
         * Creates a Submission message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Submission
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Submission} Submission
         */
        Submission.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.Submission)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.Submission: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.Submission();
            if (object.bountyId != null)
                if (typeof object.bountyId === "string")
                    $util.base64.decode(object.bountyId, message.bountyId = $util.newBuffer($util.base64.length(object.bountyId)), 0);
                else if (object.bountyId.length >= 0)
                    message.bountyId = object.bountyId;
            if (object.submitter != null)
                if (typeof object.submitter === "string")
                    $util.base64.decode(object.submitter, message.submitter = $util.newBuffer($util.base64.length(object.submitter)), 0);
                else if (object.submitter.length >= 0)
                    message.submitter = object.submitter;
            if (object.description != null)
                message.description = String(object.description);
            if (object.repoUrl != null)
                message.repoUrl = String(object.repoUrl);
            if (object.demoUrl != null)
                message.demoUrl = String(object.demoUrl);
            if (object.submittedAt != null)
                if ($util.Long)
                    message.submittedAt = $util.Long.fromValue(object.submittedAt, true);
                else if (typeof object.submittedAt === "string")
                    message.submittedAt = parseInt(object.submittedAt, 10);
                else if (typeof object.submittedAt === "number")
                    message.submittedAt = object.submittedAt;
                else if (typeof object.submittedAt === "object")
                    message.submittedAt = new $util.LongBits(object.submittedAt.low >>> 0, object.submittedAt.high >>> 0).toNumber(true);
            if (object.updatedAt != null)
                if ($util.Long)
                    message.updatedAt = $util.Long.fromValue(object.updatedAt, true);
                else if (typeof object.updatedAt === "string")
                    message.updatedAt = parseInt(object.updatedAt, 10);
                else if (typeof object.updatedAt === "number")
                    message.updatedAt = object.updatedAt;
                else if (typeof object.updatedAt === "object")
                    message.updatedAt = new $util.LongBits(object.updatedAt.low >>> 0, object.updatedAt.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Submission message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Submission
         * @static
         * @param {types.Submission} message Submission
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Submission.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.bountyId = "";
                else {
                    object.bountyId = [];
                    if (options.bytes !== Array)
                        object.bountyId = $util.newBuffer(object.bountyId);
                }
                if (options.bytes === String)
                    object.submitter = "";
                else {
                    object.submitter = [];
                    if (options.bytes !== Array)
                        object.submitter = $util.newBuffer(object.submitter);
                }
                object.description = "";
                object.repoUrl = "";
                object.demoUrl = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.submittedAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.submittedAt = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.updatedAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.updatedAt = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.bountyId != null && Object.hasOwnProperty.call(message, "bountyId"))
                object.bountyId = options.bytes === String ? $util.base64.encode(message.bountyId, 0, message.bountyId.length) : options.bytes === Array ? Array.prototype.slice.call(message.bountyId) : message.bountyId;
            if (message.submitter != null && Object.hasOwnProperty.call(message, "submitter"))
                object.submitter = options.bytes === String ? $util.base64.encode(message.submitter, 0, message.submitter.length) : options.bytes === Array ? Array.prototype.slice.call(message.submitter) : message.submitter;
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                object.description = message.description;
            if (message.repoUrl != null && Object.hasOwnProperty.call(message, "repoUrl"))
                object.repoUrl = message.repoUrl;
            if (message.demoUrl != null && Object.hasOwnProperty.call(message, "demoUrl"))
                object.demoUrl = message.demoUrl;
            if (message.submittedAt != null && Object.hasOwnProperty.call(message, "submittedAt"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.submittedAt = typeof message.submittedAt === "number" ? BigInt(message.submittedAt) : $util.Long.fromBits(message.submittedAt.low >>> 0, message.submittedAt.high >>> 0, true).toBigInt();
                else if (typeof message.submittedAt === "number")
                    object.submittedAt = options.longs === String ? String(message.submittedAt) : message.submittedAt;
                else
                    object.submittedAt = options.longs === String ? $util.Long.prototype.toString.call(message.submittedAt) : options.longs === Number ? new $util.LongBits(message.submittedAt.low >>> 0, message.submittedAt.high >>> 0).toNumber(true) : message.submittedAt;
            if (message.updatedAt != null && Object.hasOwnProperty.call(message, "updatedAt"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.updatedAt = typeof message.updatedAt === "number" ? BigInt(message.updatedAt) : $util.Long.fromBits(message.updatedAt.low >>> 0, message.updatedAt.high >>> 0, true).toBigInt();
                else if (typeof message.updatedAt === "number")
                    object.updatedAt = options.longs === String ? String(message.updatedAt) : message.updatedAt;
                else
                    object.updatedAt = options.longs === String ? $util.Long.prototype.toString.call(message.updatedAt) : options.longs === Number ? new $util.LongBits(message.updatedAt.low >>> 0, message.updatedAt.high >>> 0).toNumber(true) : message.updatedAt;
            return object;
        };

        /**
         * Converts this Submission to JSON.
         * @function toJSON
         * @memberof types.Submission
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Submission.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Submission
         * @function getTypeUrl
         * @memberof types.Submission
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Submission.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Submission";
        };

        return Submission;
    })();

    types.MessageSelectWinner = (function() {

        /**
         * Properties of a MessageSelectWinner.
         * @memberof types
         * @interface IMessageSelectWinner
         * @property {Uint8Array|null} [signerAddress] MessageSelectWinner signerAddress
         * @property {Uint8Array|null} [bountyId] MessageSelectWinner bountyId
         * @property {Uint8Array|null} [winnerAddress] MessageSelectWinner winnerAddress
         */

        /**
         * Constructs a new MessageSelectWinner.
         * @memberof types
         * @classdesc Represents a MessageSelectWinner.
         * @implements IMessageSelectWinner
         * @constructor
         * @param {types.IMessageSelectWinner=} [properties] Properties to set
         */
        function MessageSelectWinner(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageSelectWinner signerAddress.
         * @member {Uint8Array} signerAddress
         * @memberof types.MessageSelectWinner
         * @instance
         */
        MessageSelectWinner.prototype.signerAddress = $util.newBuffer([]);

        /**
         * MessageSelectWinner bountyId.
         * @member {Uint8Array} bountyId
         * @memberof types.MessageSelectWinner
         * @instance
         */
        MessageSelectWinner.prototype.bountyId = $util.newBuffer([]);

        /**
         * MessageSelectWinner winnerAddress.
         * @member {Uint8Array} winnerAddress
         * @memberof types.MessageSelectWinner
         * @instance
         */
        MessageSelectWinner.prototype.winnerAddress = $util.newBuffer([]);

        /**
         * Creates a new MessageSelectWinner instance using the specified properties.
         * @function create
         * @memberof types.MessageSelectWinner
         * @static
         * @param {types.IMessageSelectWinner=} [properties] Properties to set
         * @returns {types.MessageSelectWinner} MessageSelectWinner instance
         */
        MessageSelectWinner.create = function create(properties) {
            return new MessageSelectWinner(properties);
        };

        /**
         * Encodes the specified MessageSelectWinner message. Does not implicitly {@link types.MessageSelectWinner.verify|verify} messages.
         * @function encode
         * @memberof types.MessageSelectWinner
         * @static
         * @param {types.IMessageSelectWinner} message MessageSelectWinner message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageSelectWinner.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.signerAddress != null && Object.hasOwnProperty.call(message, "signerAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.signerAddress);
            if (message.bountyId != null && Object.hasOwnProperty.call(message, "bountyId"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.bountyId);
            if (message.winnerAddress != null && Object.hasOwnProperty.call(message, "winnerAddress"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.winnerAddress);
            return writer;
        };

        /**
         * Encodes the specified MessageSelectWinner message, length delimited. Does not implicitly {@link types.MessageSelectWinner.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessageSelectWinner
         * @static
         * @param {types.IMessageSelectWinner} message MessageSelectWinner message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageSelectWinner.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a MessageSelectWinner message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessageSelectWinner
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessageSelectWinner} MessageSelectWinner
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageSelectWinner.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessageSelectWinner();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.signerAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.bountyId = reader.bytes();
                        break;
                    }
                case 3: {
                        message.winnerAddress = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageSelectWinner message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessageSelectWinner
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessageSelectWinner} MessageSelectWinner
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageSelectWinner.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageSelectWinner message.
         * @function verify
         * @memberof types.MessageSelectWinner
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageSelectWinner.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.signerAddress != null && Object.hasOwnProperty.call(message, "signerAddress"))
                if (!(message.signerAddress && typeof message.signerAddress.length === "number" || $util.isString(message.signerAddress)))
                    return "signerAddress: buffer expected";
            if (message.bountyId != null && Object.hasOwnProperty.call(message, "bountyId"))
                if (!(message.bountyId && typeof message.bountyId.length === "number" || $util.isString(message.bountyId)))
                    return "bountyId: buffer expected";
            if (message.winnerAddress != null && Object.hasOwnProperty.call(message, "winnerAddress"))
                if (!(message.winnerAddress && typeof message.winnerAddress.length === "number" || $util.isString(message.winnerAddress)))
                    return "winnerAddress: buffer expected";
            return null;
        };

        /**
         * Creates a MessageSelectWinner message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessageSelectWinner
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessageSelectWinner} MessageSelectWinner
         */
        MessageSelectWinner.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.MessageSelectWinner)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.MessageSelectWinner: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.MessageSelectWinner();
            if (object.signerAddress != null)
                if (typeof object.signerAddress === "string")
                    $util.base64.decode(object.signerAddress, message.signerAddress = $util.newBuffer($util.base64.length(object.signerAddress)), 0);
                else if (object.signerAddress.length >= 0)
                    message.signerAddress = object.signerAddress;
            if (object.bountyId != null)
                if (typeof object.bountyId === "string")
                    $util.base64.decode(object.bountyId, message.bountyId = $util.newBuffer($util.base64.length(object.bountyId)), 0);
                else if (object.bountyId.length >= 0)
                    message.bountyId = object.bountyId;
            if (object.winnerAddress != null)
                if (typeof object.winnerAddress === "string")
                    $util.base64.decode(object.winnerAddress, message.winnerAddress = $util.newBuffer($util.base64.length(object.winnerAddress)), 0);
                else if (object.winnerAddress.length >= 0)
                    message.winnerAddress = object.winnerAddress;
            return message;
        };

        /**
         * Creates a plain object from a MessageSelectWinner message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessageSelectWinner
         * @static
         * @param {types.MessageSelectWinner} message MessageSelectWinner
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageSelectWinner.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.signerAddress = "";
                else {
                    object.signerAddress = [];
                    if (options.bytes !== Array)
                        object.signerAddress = $util.newBuffer(object.signerAddress);
                }
                if (options.bytes === String)
                    object.bountyId = "";
                else {
                    object.bountyId = [];
                    if (options.bytes !== Array)
                        object.bountyId = $util.newBuffer(object.bountyId);
                }
                if (options.bytes === String)
                    object.winnerAddress = "";
                else {
                    object.winnerAddress = [];
                    if (options.bytes !== Array)
                        object.winnerAddress = $util.newBuffer(object.winnerAddress);
                }
            }
            if (message.signerAddress != null && Object.hasOwnProperty.call(message, "signerAddress"))
                object.signerAddress = options.bytes === String ? $util.base64.encode(message.signerAddress, 0, message.signerAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.signerAddress) : message.signerAddress;
            if (message.bountyId != null && Object.hasOwnProperty.call(message, "bountyId"))
                object.bountyId = options.bytes === String ? $util.base64.encode(message.bountyId, 0, message.bountyId.length) : options.bytes === Array ? Array.prototype.slice.call(message.bountyId) : message.bountyId;
            if (message.winnerAddress != null && Object.hasOwnProperty.call(message, "winnerAddress"))
                object.winnerAddress = options.bytes === String ? $util.base64.encode(message.winnerAddress, 0, message.winnerAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.winnerAddress) : message.winnerAddress;
            return object;
        };

        /**
         * Converts this MessageSelectWinner to JSON.
         * @function toJSON
         * @memberof types.MessageSelectWinner
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageSelectWinner.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageSelectWinner
         * @function getTypeUrl
         * @memberof types.MessageSelectWinner
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageSelectWinner.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessageSelectWinner";
        };

        return MessageSelectWinner;
    })();

    types.MessageCreateProfile = (function() {

        /**
         * Properties of a MessageCreateProfile.
         * @memberof types
         * @interface IMessageCreateProfile
         * @property {Uint8Array|null} [signerAddress] MessageCreateProfile signerAddress
         * @property {string|null} [username] MessageCreateProfile username
         * @property {string|null} [avatarUrl] MessageCreateProfile avatarUrl
         * @property {string|null} [bio] MessageCreateProfile bio
         */

        /**
         * Constructs a new MessageCreateProfile.
         * @memberof types
         * @classdesc Represents a MessageCreateProfile.
         * @implements IMessageCreateProfile
         * @constructor
         * @param {types.IMessageCreateProfile=} [properties] Properties to set
         */
        function MessageCreateProfile(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageCreateProfile signerAddress.
         * @member {Uint8Array} signerAddress
         * @memberof types.MessageCreateProfile
         * @instance
         */
        MessageCreateProfile.prototype.signerAddress = $util.newBuffer([]);

        /**
         * MessageCreateProfile username.
         * @member {string} username
         * @memberof types.MessageCreateProfile
         * @instance
         */
        MessageCreateProfile.prototype.username = "";

        /**
         * MessageCreateProfile avatarUrl.
         * @member {string} avatarUrl
         * @memberof types.MessageCreateProfile
         * @instance
         */
        MessageCreateProfile.prototype.avatarUrl = "";

        /**
         * MessageCreateProfile bio.
         * @member {string} bio
         * @memberof types.MessageCreateProfile
         * @instance
         */
        MessageCreateProfile.prototype.bio = "";

        /**
         * Creates a new MessageCreateProfile instance using the specified properties.
         * @function create
         * @memberof types.MessageCreateProfile
         * @static
         * @param {types.IMessageCreateProfile=} [properties] Properties to set
         * @returns {types.MessageCreateProfile} MessageCreateProfile instance
         */
        MessageCreateProfile.create = function create(properties) {
            return new MessageCreateProfile(properties);
        };

        /**
         * Encodes the specified MessageCreateProfile message. Does not implicitly {@link types.MessageCreateProfile.verify|verify} messages.
         * @function encode
         * @memberof types.MessageCreateProfile
         * @static
         * @param {types.IMessageCreateProfile} message MessageCreateProfile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageCreateProfile.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.signerAddress != null && Object.hasOwnProperty.call(message, "signerAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.signerAddress);
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
            if (message.avatarUrl != null && Object.hasOwnProperty.call(message, "avatarUrl"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.avatarUrl);
            if (message.bio != null && Object.hasOwnProperty.call(message, "bio"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.bio);
            return writer;
        };

        /**
         * Encodes the specified MessageCreateProfile message, length delimited. Does not implicitly {@link types.MessageCreateProfile.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessageCreateProfile
         * @static
         * @param {types.IMessageCreateProfile} message MessageCreateProfile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageCreateProfile.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a MessageCreateProfile message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessageCreateProfile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessageCreateProfile} MessageCreateProfile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageCreateProfile.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessageCreateProfile();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.signerAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.username = reader.string();
                        break;
                    }
                case 3: {
                        message.avatarUrl = reader.string();
                        break;
                    }
                case 4: {
                        message.bio = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageCreateProfile message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessageCreateProfile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessageCreateProfile} MessageCreateProfile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageCreateProfile.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageCreateProfile message.
         * @function verify
         * @memberof types.MessageCreateProfile
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageCreateProfile.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.signerAddress != null && Object.hasOwnProperty.call(message, "signerAddress"))
                if (!(message.signerAddress && typeof message.signerAddress.length === "number" || $util.isString(message.signerAddress)))
                    return "signerAddress: buffer expected";
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            if (message.avatarUrl != null && Object.hasOwnProperty.call(message, "avatarUrl"))
                if (!$util.isString(message.avatarUrl))
                    return "avatarUrl: string expected";
            if (message.bio != null && Object.hasOwnProperty.call(message, "bio"))
                if (!$util.isString(message.bio))
                    return "bio: string expected";
            return null;
        };

        /**
         * Creates a MessageCreateProfile message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessageCreateProfile
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessageCreateProfile} MessageCreateProfile
         */
        MessageCreateProfile.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.MessageCreateProfile)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.MessageCreateProfile: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.MessageCreateProfile();
            if (object.signerAddress != null)
                if (typeof object.signerAddress === "string")
                    $util.base64.decode(object.signerAddress, message.signerAddress = $util.newBuffer($util.base64.length(object.signerAddress)), 0);
                else if (object.signerAddress.length >= 0)
                    message.signerAddress = object.signerAddress;
            if (object.username != null)
                message.username = String(object.username);
            if (object.avatarUrl != null)
                message.avatarUrl = String(object.avatarUrl);
            if (object.bio != null)
                message.bio = String(object.bio);
            return message;
        };

        /**
         * Creates a plain object from a MessageCreateProfile message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessageCreateProfile
         * @static
         * @param {types.MessageCreateProfile} message MessageCreateProfile
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageCreateProfile.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.signerAddress = "";
                else {
                    object.signerAddress = [];
                    if (options.bytes !== Array)
                        object.signerAddress = $util.newBuffer(object.signerAddress);
                }
                object.username = "";
                object.avatarUrl = "";
                object.bio = "";
            }
            if (message.signerAddress != null && Object.hasOwnProperty.call(message, "signerAddress"))
                object.signerAddress = options.bytes === String ? $util.base64.encode(message.signerAddress, 0, message.signerAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.signerAddress) : message.signerAddress;
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                object.username = message.username;
            if (message.avatarUrl != null && Object.hasOwnProperty.call(message, "avatarUrl"))
                object.avatarUrl = message.avatarUrl;
            if (message.bio != null && Object.hasOwnProperty.call(message, "bio"))
                object.bio = message.bio;
            return object;
        };

        /**
         * Converts this MessageCreateProfile to JSON.
         * @function toJSON
         * @memberof types.MessageCreateProfile
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageCreateProfile.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageCreateProfile
         * @function getTypeUrl
         * @memberof types.MessageCreateProfile
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageCreateProfile.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessageCreateProfile";
        };

        return MessageCreateProfile;
    })();

    types.Profile = (function() {

        /**
         * Properties of a Profile.
         * @memberof types
         * @interface IProfile
         * @property {Uint8Array|null} [address] Profile address
         * @property {string|null} [username] Profile username
         * @property {string|null} [avatarUrl] Profile avatarUrl
         * @property {string|null} [bio] Profile bio
         * @property {number|Long|null} [reputation] Profile reputation
         * @property {number|Long|null} [totalRewardsEarned] Profile totalRewardsEarned
         * @property {number|Long|null} [completedBounties] Profile completedBounties
         * @property {number|Long|null} [createdBounties] Profile createdBounties
         * @property {number|Long|null} [createdAt] Profile createdAt
         * @property {number|Long|null} [updatedAt] Profile updatedAt
         */

        /**
         * Constructs a new Profile.
         * @memberof types
         * @classdesc Represents a Profile.
         * @implements IProfile
         * @constructor
         * @param {types.IProfile=} [properties] Properties to set
         */
        function Profile(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Profile address.
         * @member {Uint8Array} address
         * @memberof types.Profile
         * @instance
         */
        Profile.prototype.address = $util.newBuffer([]);

        /**
         * Profile username.
         * @member {string} username
         * @memberof types.Profile
         * @instance
         */
        Profile.prototype.username = "";

        /**
         * Profile avatarUrl.
         * @member {string} avatarUrl
         * @memberof types.Profile
         * @instance
         */
        Profile.prototype.avatarUrl = "";

        /**
         * Profile bio.
         * @member {string} bio
         * @memberof types.Profile
         * @instance
         */
        Profile.prototype.bio = "";

        /**
         * Profile reputation.
         * @member {number|Long} reputation
         * @memberof types.Profile
         * @instance
         */
        Profile.prototype.reputation = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Profile totalRewardsEarned.
         * @member {number|Long} totalRewardsEarned
         * @memberof types.Profile
         * @instance
         */
        Profile.prototype.totalRewardsEarned = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Profile completedBounties.
         * @member {number|Long} completedBounties
         * @memberof types.Profile
         * @instance
         */
        Profile.prototype.completedBounties = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Profile createdBounties.
         * @member {number|Long} createdBounties
         * @memberof types.Profile
         * @instance
         */
        Profile.prototype.createdBounties = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Profile createdAt.
         * @member {number|Long} createdAt
         * @memberof types.Profile
         * @instance
         */
        Profile.prototype.createdAt = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Profile updatedAt.
         * @member {number|Long} updatedAt
         * @memberof types.Profile
         * @instance
         */
        Profile.prototype.updatedAt = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Profile instance using the specified properties.
         * @function create
         * @memberof types.Profile
         * @static
         * @param {types.IProfile=} [properties] Properties to set
         * @returns {types.Profile} Profile instance
         */
        Profile.create = function create(properties) {
            return new Profile(properties);
        };

        /**
         * Encodes the specified Profile message. Does not implicitly {@link types.Profile.verify|verify} messages.
         * @function encode
         * @memberof types.Profile
         * @static
         * @param {types.IProfile} message Profile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Profile.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.address);
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
            if (message.avatarUrl != null && Object.hasOwnProperty.call(message, "avatarUrl"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.avatarUrl);
            if (message.bio != null && Object.hasOwnProperty.call(message, "bio"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.bio);
            if (message.reputation != null && Object.hasOwnProperty.call(message, "reputation"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.reputation);
            if (message.totalRewardsEarned != null && Object.hasOwnProperty.call(message, "totalRewardsEarned"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.totalRewardsEarned);
            if (message.completedBounties != null && Object.hasOwnProperty.call(message, "completedBounties"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.completedBounties);
            if (message.createdBounties != null && Object.hasOwnProperty.call(message, "createdBounties"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.createdBounties);
            if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
                writer.uint32(/* id 9, wireType 0 =*/72).uint64(message.createdAt);
            if (message.updatedAt != null && Object.hasOwnProperty.call(message, "updatedAt"))
                writer.uint32(/* id 10, wireType 0 =*/80).uint64(message.updatedAt);
            return writer;
        };

        /**
         * Encodes the specified Profile message, length delimited. Does not implicitly {@link types.Profile.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Profile
         * @static
         * @param {types.IProfile} message Profile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Profile.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Profile message from the specified reader or buffer.
         * @function decode
         * @memberof types.Profile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Profile} Profile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Profile.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Profile();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.address = reader.bytes();
                        break;
                    }
                case 2: {
                        message.username = reader.string();
                        break;
                    }
                case 3: {
                        message.avatarUrl = reader.string();
                        break;
                    }
                case 4: {
                        message.bio = reader.string();
                        break;
                    }
                case 5: {
                        message.reputation = reader.uint64();
                        break;
                    }
                case 6: {
                        message.totalRewardsEarned = reader.uint64();
                        break;
                    }
                case 7: {
                        message.completedBounties = reader.uint64();
                        break;
                    }
                case 8: {
                        message.createdBounties = reader.uint64();
                        break;
                    }
                case 9: {
                        message.createdAt = reader.uint64();
                        break;
                    }
                case 10: {
                        message.updatedAt = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Profile message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Profile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Profile} Profile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Profile.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Profile message.
         * @function verify
         * @memberof types.Profile
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Profile.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                if (!(message.address && typeof message.address.length === "number" || $util.isString(message.address)))
                    return "address: buffer expected";
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            if (message.avatarUrl != null && Object.hasOwnProperty.call(message, "avatarUrl"))
                if (!$util.isString(message.avatarUrl))
                    return "avatarUrl: string expected";
            if (message.bio != null && Object.hasOwnProperty.call(message, "bio"))
                if (!$util.isString(message.bio))
                    return "bio: string expected";
            if (message.reputation != null && Object.hasOwnProperty.call(message, "reputation"))
                if (!$util.isInteger(message.reputation) && !(message.reputation && $util.isInteger(message.reputation.low) && $util.isInteger(message.reputation.high)))
                    return "reputation: integer|Long expected";
            if (message.totalRewardsEarned != null && Object.hasOwnProperty.call(message, "totalRewardsEarned"))
                if (!$util.isInteger(message.totalRewardsEarned) && !(message.totalRewardsEarned && $util.isInteger(message.totalRewardsEarned.low) && $util.isInteger(message.totalRewardsEarned.high)))
                    return "totalRewardsEarned: integer|Long expected";
            if (message.completedBounties != null && Object.hasOwnProperty.call(message, "completedBounties"))
                if (!$util.isInteger(message.completedBounties) && !(message.completedBounties && $util.isInteger(message.completedBounties.low) && $util.isInteger(message.completedBounties.high)))
                    return "completedBounties: integer|Long expected";
            if (message.createdBounties != null && Object.hasOwnProperty.call(message, "createdBounties"))
                if (!$util.isInteger(message.createdBounties) && !(message.createdBounties && $util.isInteger(message.createdBounties.low) && $util.isInteger(message.createdBounties.high)))
                    return "createdBounties: integer|Long expected";
            if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
                if (!$util.isInteger(message.createdAt) && !(message.createdAt && $util.isInteger(message.createdAt.low) && $util.isInteger(message.createdAt.high)))
                    return "createdAt: integer|Long expected";
            if (message.updatedAt != null && Object.hasOwnProperty.call(message, "updatedAt"))
                if (!$util.isInteger(message.updatedAt) && !(message.updatedAt && $util.isInteger(message.updatedAt.low) && $util.isInteger(message.updatedAt.high)))
                    return "updatedAt: integer|Long expected";
            return null;
        };

        /**
         * Creates a Profile message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Profile
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Profile} Profile
         */
        Profile.fromObject = function fromObject(object, long) {
            if (object instanceof $root.types.Profile)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".types.Profile: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.types.Profile();
            if (object.address != null)
                if (typeof object.address === "string")
                    $util.base64.decode(object.address, message.address = $util.newBuffer($util.base64.length(object.address)), 0);
                else if (object.address.length >= 0)
                    message.address = object.address;
            if (object.username != null)
                message.username = String(object.username);
            if (object.avatarUrl != null)
                message.avatarUrl = String(object.avatarUrl);
            if (object.bio != null)
                message.bio = String(object.bio);
            if (object.reputation != null)
                if ($util.Long)
                    message.reputation = $util.Long.fromValue(object.reputation, true);
                else if (typeof object.reputation === "string")
                    message.reputation = parseInt(object.reputation, 10);
                else if (typeof object.reputation === "number")
                    message.reputation = object.reputation;
                else if (typeof object.reputation === "object")
                    message.reputation = new $util.LongBits(object.reputation.low >>> 0, object.reputation.high >>> 0).toNumber(true);
            if (object.totalRewardsEarned != null)
                if ($util.Long)
                    message.totalRewardsEarned = $util.Long.fromValue(object.totalRewardsEarned, true);
                else if (typeof object.totalRewardsEarned === "string")
                    message.totalRewardsEarned = parseInt(object.totalRewardsEarned, 10);
                else if (typeof object.totalRewardsEarned === "number")
                    message.totalRewardsEarned = object.totalRewardsEarned;
                else if (typeof object.totalRewardsEarned === "object")
                    message.totalRewardsEarned = new $util.LongBits(object.totalRewardsEarned.low >>> 0, object.totalRewardsEarned.high >>> 0).toNumber(true);
            if (object.completedBounties != null)
                if ($util.Long)
                    message.completedBounties = $util.Long.fromValue(object.completedBounties, true);
                else if (typeof object.completedBounties === "string")
                    message.completedBounties = parseInt(object.completedBounties, 10);
                else if (typeof object.completedBounties === "number")
                    message.completedBounties = object.completedBounties;
                else if (typeof object.completedBounties === "object")
                    message.completedBounties = new $util.LongBits(object.completedBounties.low >>> 0, object.completedBounties.high >>> 0).toNumber(true);
            if (object.createdBounties != null)
                if ($util.Long)
                    message.createdBounties = $util.Long.fromValue(object.createdBounties, true);
                else if (typeof object.createdBounties === "string")
                    message.createdBounties = parseInt(object.createdBounties, 10);
                else if (typeof object.createdBounties === "number")
                    message.createdBounties = object.createdBounties;
                else if (typeof object.createdBounties === "object")
                    message.createdBounties = new $util.LongBits(object.createdBounties.low >>> 0, object.createdBounties.high >>> 0).toNumber(true);
            if (object.createdAt != null)
                if ($util.Long)
                    message.createdAt = $util.Long.fromValue(object.createdAt, true);
                else if (typeof object.createdAt === "string")
                    message.createdAt = parseInt(object.createdAt, 10);
                else if (typeof object.createdAt === "number")
                    message.createdAt = object.createdAt;
                else if (typeof object.createdAt === "object")
                    message.createdAt = new $util.LongBits(object.createdAt.low >>> 0, object.createdAt.high >>> 0).toNumber(true);
            if (object.updatedAt != null)
                if ($util.Long)
                    message.updatedAt = $util.Long.fromValue(object.updatedAt, true);
                else if (typeof object.updatedAt === "string")
                    message.updatedAt = parseInt(object.updatedAt, 10);
                else if (typeof object.updatedAt === "number")
                    message.updatedAt = object.updatedAt;
                else if (typeof object.updatedAt === "object")
                    message.updatedAt = new $util.LongBits(object.updatedAt.low >>> 0, object.updatedAt.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Profile message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Profile
         * @static
         * @param {types.Profile} message Profile
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Profile.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.address = "";
                else {
                    object.address = [];
                    if (options.bytes !== Array)
                        object.address = $util.newBuffer(object.address);
                }
                object.username = "";
                object.avatarUrl = "";
                object.bio = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.reputation = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.reputation = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.totalRewardsEarned = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.totalRewardsEarned = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.completedBounties = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.completedBounties = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.createdBounties = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.createdBounties = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.createdAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.createdAt = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.updatedAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.updatedAt = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                object.address = options.bytes === String ? $util.base64.encode(message.address, 0, message.address.length) : options.bytes === Array ? Array.prototype.slice.call(message.address) : message.address;
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                object.username = message.username;
            if (message.avatarUrl != null && Object.hasOwnProperty.call(message, "avatarUrl"))
                object.avatarUrl = message.avatarUrl;
            if (message.bio != null && Object.hasOwnProperty.call(message, "bio"))
                object.bio = message.bio;
            if (message.reputation != null && Object.hasOwnProperty.call(message, "reputation"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.reputation = typeof message.reputation === "number" ? BigInt(message.reputation) : $util.Long.fromBits(message.reputation.low >>> 0, message.reputation.high >>> 0, true).toBigInt();
                else if (typeof message.reputation === "number")
                    object.reputation = options.longs === String ? String(message.reputation) : message.reputation;
                else
                    object.reputation = options.longs === String ? $util.Long.prototype.toString.call(message.reputation) : options.longs === Number ? new $util.LongBits(message.reputation.low >>> 0, message.reputation.high >>> 0).toNumber(true) : message.reputation;
            if (message.totalRewardsEarned != null && Object.hasOwnProperty.call(message, "totalRewardsEarned"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.totalRewardsEarned = typeof message.totalRewardsEarned === "number" ? BigInt(message.totalRewardsEarned) : $util.Long.fromBits(message.totalRewardsEarned.low >>> 0, message.totalRewardsEarned.high >>> 0, true).toBigInt();
                else if (typeof message.totalRewardsEarned === "number")
                    object.totalRewardsEarned = options.longs === String ? String(message.totalRewardsEarned) : message.totalRewardsEarned;
                else
                    object.totalRewardsEarned = options.longs === String ? $util.Long.prototype.toString.call(message.totalRewardsEarned) : options.longs === Number ? new $util.LongBits(message.totalRewardsEarned.low >>> 0, message.totalRewardsEarned.high >>> 0).toNumber(true) : message.totalRewardsEarned;
            if (message.completedBounties != null && Object.hasOwnProperty.call(message, "completedBounties"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.completedBounties = typeof message.completedBounties === "number" ? BigInt(message.completedBounties) : $util.Long.fromBits(message.completedBounties.low >>> 0, message.completedBounties.high >>> 0, true).toBigInt();
                else if (typeof message.completedBounties === "number")
                    object.completedBounties = options.longs === String ? String(message.completedBounties) : message.completedBounties;
                else
                    object.completedBounties = options.longs === String ? $util.Long.prototype.toString.call(message.completedBounties) : options.longs === Number ? new $util.LongBits(message.completedBounties.low >>> 0, message.completedBounties.high >>> 0).toNumber(true) : message.completedBounties;
            if (message.createdBounties != null && Object.hasOwnProperty.call(message, "createdBounties"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.createdBounties = typeof message.createdBounties === "number" ? BigInt(message.createdBounties) : $util.Long.fromBits(message.createdBounties.low >>> 0, message.createdBounties.high >>> 0, true).toBigInt();
                else if (typeof message.createdBounties === "number")
                    object.createdBounties = options.longs === String ? String(message.createdBounties) : message.createdBounties;
                else
                    object.createdBounties = options.longs === String ? $util.Long.prototype.toString.call(message.createdBounties) : options.longs === Number ? new $util.LongBits(message.createdBounties.low >>> 0, message.createdBounties.high >>> 0).toNumber(true) : message.createdBounties;
            if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.createdAt = typeof message.createdAt === "number" ? BigInt(message.createdAt) : $util.Long.fromBits(message.createdAt.low >>> 0, message.createdAt.high >>> 0, true).toBigInt();
                else if (typeof message.createdAt === "number")
                    object.createdAt = options.longs === String ? String(message.createdAt) : message.createdAt;
                else
                    object.createdAt = options.longs === String ? $util.Long.prototype.toString.call(message.createdAt) : options.longs === Number ? new $util.LongBits(message.createdAt.low >>> 0, message.createdAt.high >>> 0).toNumber(true) : message.createdAt;
            if (message.updatedAt != null && Object.hasOwnProperty.call(message, "updatedAt"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.updatedAt = typeof message.updatedAt === "number" ? BigInt(message.updatedAt) : $util.Long.fromBits(message.updatedAt.low >>> 0, message.updatedAt.high >>> 0, true).toBigInt();
                else if (typeof message.updatedAt === "number")
                    object.updatedAt = options.longs === String ? String(message.updatedAt) : message.updatedAt;
                else
                    object.updatedAt = options.longs === String ? $util.Long.prototype.toString.call(message.updatedAt) : options.longs === Number ? new $util.LongBits(message.updatedAt.low >>> 0, message.updatedAt.high >>> 0).toNumber(true) : message.updatedAt;
            return object;
        };

        /**
         * Converts this Profile to JSON.
         * @function toJSON
         * @memberof types.Profile
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Profile.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Profile
         * @function getTypeUrl
         * @memberof types.Profile
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Profile.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Profile";
        };

        return Profile;
    })();

    return types;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Any = (function() {

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [properties] Properties to set
             */
            function Any(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Any type_url.
             * @member {string} type_url
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.type_url = "";

            /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new Any instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             */
            Any.create = function create(properties) {
                return new Any(properties);
            };

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.type_url != null && Object.hasOwnProperty.call(message, "type_url"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type_url);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.type_url = reader.string();
                            break;
                        }
                    case 2: {
                            message.value = reader.bytes();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Any message.
             * @function verify
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Any.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.type_url != null && Object.hasOwnProperty.call(message, "type_url"))
                    if (!$util.isString(message.type_url))
                        return "type_url: string expected";
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Any} Any
             */
            Any.fromObject = function fromObject(object, long) {
                if (object instanceof $root.google.protobuf.Any)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".google.protobuf.Any: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.google.protobuf.Any();
                if (object.type_url != null)
                    message.type_url = String(object.type_url);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length >= 0)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any} message Any
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Any.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.type_url = "";
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                }
                if (message.type_url != null && Object.hasOwnProperty.call(message, "type_url"))
                    object.type_url = message.type_url;
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this Any to JSON.
             * @function toJSON
             * @memberof google.protobuf.Any
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Any.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Any
             * @function getTypeUrl
             * @memberof google.protobuf.Any
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Any.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Any";
            };

            return Any;
        })();

        return protobuf;
    })();

    return google;
})();

export { $root as default };
