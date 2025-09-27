import {
  createUseReadContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
  createUseWriteContract,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ItoPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const itoPoolAbi = [
  {
    inputs: [
      { internalType: "address", name: "_tokenA", type: "address" },
      { internalType: "address", name: "_tokenB", type: "address" },
      { internalType: "uint256", name: "_baseRewardRate", type: "uint256" },
      { internalType: "address", name: "_router", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountADesired", type: "uint256" },
      { internalType: "uint256", name: "amountBDesired", type: "uint256" },
    ],
    name: "addLiquidity",
    outputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "amountB", type: "uint256" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "baseRewardRate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "requestId", type: "uint256" },
      { internalType: "uint256[]", name: "randomWords", type: "uint256[]" },
    ],
    name: "fulfillSwap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "distributionPeriod", type: "uint256" },
    ],
    name: "fundRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPoolState",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "reserveA", type: "uint256" },
          { internalType: "uint256", name: "reserveB", type: "uint256" },
          { internalType: "uint256", name: "totalLPTokens", type: "uint256" },
          { internalType: "uint256", name: "lastUpdate", type: "uint256" },
          {
            internalType: "uint256",
            name: "accRewardPerShare",
            type: "uint256",
          },
        ],
        internalType: "struct IPool.PoolState",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getUserPosition",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "lpTokens", type: "uint256" },
          { internalType: "uint256", name: "rewardDebt", type: "uint256" },
          { internalType: "uint256", name: "lastInteraction", type: "uint256" },
        ],
        internalType: "struct IPool.UserPosition",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextRequestId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "pendingRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "poolState",
    outputs: [
      { internalType: "uint256", name: "reserveA", type: "uint256" },
      { internalType: "uint256", name: "reserveB", type: "uint256" },
      { internalType: "uint256", name: "totalLPTokens", type: "uint256" },
      { internalType: "uint256", name: "lastUpdate", type: "uint256" },
      { internalType: "uint256", name: "accRewardPerShare", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "liquidity", type: "uint256" }],
    name: "removeLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "router",
    outputs: [
      { internalType: "contract ItoRouter", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenIn", type: "address" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
    ],
    name: "swap",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "swapRequests",
    outputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "timestamp", type: "uint256" },
      { internalType: "uint256", name: "fee", type: "uint256" },
      { internalType: "address", name: "user", type: "address" },
      { internalType: "address", name: "tokenIn", type: "address" },
      { internalType: "uint8", name: "errorCode", type: "uint8" },
      { internalType: "bool", name: "isError", type: "bool" },
      { internalType: "bool", name: "isFulfilled", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenA",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenB",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userPositions",
    outputs: [
      { internalType: "uint256", name: "lpTokens", type: "uint256" },
      { internalType: "uint256", name: "rewardDebt", type: "uint256" },
      { internalType: "uint256", name: "lastInteraction", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "provider",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    name: "LiquidityAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "provider",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    name: "LiquidityRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "feeCharged",
        type: "uint256",
      },
    ],
    name: "SwapCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    name: "SwapInitiated",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "InsufficientAmount",
    type: "error",
  },
  { inputs: [], name: "InsufficientLiquidity", type: "error" },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "InsufficientReserves",
    type: "error",
  },
  { inputs: [], name: "InvalidAmount", type: "error" },
  { inputs: [], name: "NotOwner", type: "error" },
  { inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
  { inputs: [], name: "RequestAlreadyFulfilled", type: "error" },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
] as const;

export const itoPoolAddress =
  "0x66e2d611763974a7645469bc179fA70e61CDC2F1" as const;

export const itoPoolConfig = {
  abi: itoPoolAbi,
  address: itoPoolAddress,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ItoRouter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const itoRouterAbi = [
  {
    inputs: [
      { internalType: "address", name: "initialOwner", type: "address" },
      { internalType: "address", name: "_rewardToken", type: "address" },
      { internalType: "address", name: "_oracle", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "baseRewardRate", type: "uint256" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
    ],
    name: "createPool",
    outputs: [
      { internalType: "address", name: "poolAddress", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "baseRewardRate", type: "uint256" },
    ],
    name: "getPool",
    outputs: [
      { internalType: "address", name: "poolAddress", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oracle",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "baseRewardRate", type: "uint256" },
    ],
    name: "poolExists",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "pools",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardToken",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "_version", type: "uint8" }],
    name: "setVersion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "baseRewardRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "poolAddress",
        type: "address",
      },
    ],
    name: "PoolCreated",
    type: "event",
  },
  { inputs: [], name: "Create2EmptyBytecode", type: "error" },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "DuplicateToken",
    type: "error",
  },
  { inputs: [], name: "FailedDeployment", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "InsufficientBalance",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "pool", type: "address" }],
    name: "PoolAlreadyExists",
    type: "error",
  },
  { inputs: [], name: "ZeroAddress", type: "error" },
] as const;

export const itoRouterAddress =
  "0xC94e5f5E4829b2b9AC8938E7Fe4695F6ec1B9145" as const;

export const itoRouterConfig = {
  abi: itoRouterAbi,
  address: itoRouterAddress,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ItoToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const itoTokenAbi = [
  {
    inputs: [
      { internalType: "address", name: "initialOwner", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { internalType: "bytes1", name: "fields", type: "bytes1" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "version", type: "string" },
      { internalType: "uint256", name: "chainId", type: "uint256" },
      { internalType: "address", name: "verifyingContract", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "uint256[]", name: "extensions", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "EIP712DomainChanged", type: "event" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  { inputs: [], name: "ECDSAInvalidSignature", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "length", type: "uint256" }],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "s", type: "bytes32" }],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "allowance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "approver", type: "address" }],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "receiver", type: "address" }],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "sender", type: "address" }],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "spender", type: "address" }],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "deadline", type: "uint256" }],
    name: "ERC2612ExpiredSignature",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "signer", type: "address" },
      { internalType: "address", name: "owner", type: "address" },
    ],
    name: "ERC2612InvalidSigner",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "currentNonce", type: "uint256" },
    ],
    name: "InvalidAccountNonce",
    type: "error",
  },
  { inputs: [], name: "InvalidShortString", type: "error" },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [{ internalType: "string", name: "str", type: "string" }],
    name: "StringTooLong",
    type: "error",
  },
] as const;

export const itoTokenAddress =
  "0xE2567B2A7214877D395Dfa6ca72335644B26dC23" as const;

export const itoTokenConfig = {
  abi: itoTokenAbi,
  address: itoTokenAddress,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockETH
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockEthAbi = [
  {
    inputs: [
      { internalType: "address", name: "initialOwner", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { internalType: "bytes1", name: "fields", type: "bytes1" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "version", type: "string" },
      { internalType: "uint256", name: "chainId", type: "uint256" },
      { internalType: "address", name: "verifyingContract", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "uint256[]", name: "extensions", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "EIP712DomainChanged", type: "event" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  { inputs: [], name: "ECDSAInvalidSignature", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "length", type: "uint256" }],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "s", type: "bytes32" }],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "allowance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "approver", type: "address" }],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "receiver", type: "address" }],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "sender", type: "address" }],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "spender", type: "address" }],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "deadline", type: "uint256" }],
    name: "ERC2612ExpiredSignature",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "signer", type: "address" },
      { internalType: "address", name: "owner", type: "address" },
    ],
    name: "ERC2612InvalidSigner",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "currentNonce", type: "uint256" },
    ],
    name: "InvalidAccountNonce",
    type: "error",
  },
  { inputs: [], name: "InvalidShortString", type: "error" },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [{ internalType: "string", name: "str", type: "string" }],
    name: "StringTooLong",
    type: "error",
  },
] as const;

export const mockEthAddress =
  "0xBCa528fCc1Ec19fC103Ea855BB3E371465eF74F0" as const;

export const mockEthConfig = {
  abi: mockEthAbi,
  address: mockEthAddress,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockOracle
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockOracleAbi = [
  {
    inputs: [
      { internalType: "address", name: "initialOwner", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
    ],
    name: "getPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
    ],
    name: "getVolatility",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "price",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "_newPrice", type: "uint256" },
    ],
    name: "setPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "_newPrice", type: "uint256" },
      { internalType: "uint256", name: "_newVolatility", type: "uint256" },
    ],
    name: "setPriceAndVolatility",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "_newVolatility", type: "uint256" },
    ],
    name: "setVolatility",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "volatility",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
] as const;

export const mockOracleAddress =
  "0xc77ab300b6270dA732b137a592Ce54c468859dEf" as const;

export const mockOracleConfig = {
  abi: mockOracleAbi,
  address: mockOracleAddress,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockUSDC
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockUsdcAbi = [
  {
    inputs: [
      { internalType: "address", name: "initialOwner", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { internalType: "bytes1", name: "fields", type: "bytes1" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "version", type: "string" },
      { internalType: "uint256", name: "chainId", type: "uint256" },
      { internalType: "address", name: "verifyingContract", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "uint256[]", name: "extensions", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "EIP712DomainChanged", type: "event" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  { inputs: [], name: "ECDSAInvalidSignature", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "length", type: "uint256" }],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "s", type: "bytes32" }],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "allowance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "approver", type: "address" }],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "receiver", type: "address" }],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "sender", type: "address" }],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "spender", type: "address" }],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "deadline", type: "uint256" }],
    name: "ERC2612ExpiredSignature",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "signer", type: "address" },
      { internalType: "address", name: "owner", type: "address" },
    ],
    name: "ERC2612InvalidSigner",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "currentNonce", type: "uint256" },
    ],
    name: "InvalidAccountNonce",
    type: "error",
  },
  { inputs: [], name: "InvalidShortString", type: "error" },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [{ internalType: "string", name: "str", type: "string" }],
    name: "StringTooLong",
    type: "error",
  },
] as const;

export const mockUsdcAddress =
  "0x0e561F34e023330D56AfB3b5Af082D5AF1fBf022" as const;

export const mockUsdcConfig = {
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoPoolAbi}__
 */
export const useReadItoPool = /*#__PURE__*/ createUseReadContract({
  abi: itoPoolAbi,
  address: itoPoolAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"baseRewardRate"`
 */
export const useReadItoPoolBaseRewardRate = /*#__PURE__*/ createUseReadContract(
  { abi: itoPoolAbi, address: itoPoolAddress, functionName: "baseRewardRate" },
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"getPoolState"`
 */
export const useReadItoPoolGetPoolState = /*#__PURE__*/ createUseReadContract({
  abi: itoPoolAbi,
  address: itoPoolAddress,
  functionName: "getPoolState",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"getUserPosition"`
 */
export const useReadItoPoolGetUserPosition =
  /*#__PURE__*/ createUseReadContract({
    abi: itoPoolAbi,
    address: itoPoolAddress,
    functionName: "getUserPosition",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"nextRequestId"`
 */
export const useReadItoPoolNextRequestId = /*#__PURE__*/ createUseReadContract({
  abi: itoPoolAbi,
  address: itoPoolAddress,
  functionName: "nextRequestId",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"pendingRewards"`
 */
export const useReadItoPoolPendingRewards = /*#__PURE__*/ createUseReadContract(
  { abi: itoPoolAbi, address: itoPoolAddress, functionName: "pendingRewards" },
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"poolState"`
 */
export const useReadItoPoolPoolState = /*#__PURE__*/ createUseReadContract({
  abi: itoPoolAbi,
  address: itoPoolAddress,
  functionName: "poolState",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"router"`
 */
export const useReadItoPoolRouter = /*#__PURE__*/ createUseReadContract({
  abi: itoPoolAbi,
  address: itoPoolAddress,
  functionName: "router",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"swapRequests"`
 */
export const useReadItoPoolSwapRequests = /*#__PURE__*/ createUseReadContract({
  abi: itoPoolAbi,
  address: itoPoolAddress,
  functionName: "swapRequests",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"tokenA"`
 */
export const useReadItoPoolTokenA = /*#__PURE__*/ createUseReadContract({
  abi: itoPoolAbi,
  address: itoPoolAddress,
  functionName: "tokenA",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"tokenB"`
 */
export const useReadItoPoolTokenB = /*#__PURE__*/ createUseReadContract({
  abi: itoPoolAbi,
  address: itoPoolAddress,
  functionName: "tokenB",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"userPositions"`
 */
export const useReadItoPoolUserPositions = /*#__PURE__*/ createUseReadContract({
  abi: itoPoolAbi,
  address: itoPoolAddress,
  functionName: "userPositions",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoPoolAbi}__
 */
export const useWriteItoPool = /*#__PURE__*/ createUseWriteContract({
  abi: itoPoolAbi,
  address: itoPoolAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"addLiquidity"`
 */
export const useWriteItoPoolAddLiquidity = /*#__PURE__*/ createUseWriteContract(
  { abi: itoPoolAbi, address: itoPoolAddress, functionName: "addLiquidity" },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"claimRewards"`
 */
export const useWriteItoPoolClaimRewards = /*#__PURE__*/ createUseWriteContract(
  { abi: itoPoolAbi, address: itoPoolAddress, functionName: "claimRewards" },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"fulfillSwap"`
 */
export const useWriteItoPoolFulfillSwap = /*#__PURE__*/ createUseWriteContract({
  abi: itoPoolAbi,
  address: itoPoolAddress,
  functionName: "fulfillSwap",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"fundRewards"`
 */
export const useWriteItoPoolFundRewards = /*#__PURE__*/ createUseWriteContract({
  abi: itoPoolAbi,
  address: itoPoolAddress,
  functionName: "fundRewards",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"removeLiquidity"`
 */
export const useWriteItoPoolRemoveLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: itoPoolAbi,
    address: itoPoolAddress,
    functionName: "removeLiquidity",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"swap"`
 */
export const useWriteItoPoolSwap = /*#__PURE__*/ createUseWriteContract({
  abi: itoPoolAbi,
  address: itoPoolAddress,
  functionName: "swap",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoPoolAbi}__
 */
export const useSimulateItoPool = /*#__PURE__*/ createUseSimulateContract({
  abi: itoPoolAbi,
  address: itoPoolAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"addLiquidity"`
 */
export const useSimulateItoPoolAddLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoPoolAbi,
    address: itoPoolAddress,
    functionName: "addLiquidity",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"claimRewards"`
 */
export const useSimulateItoPoolClaimRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoPoolAbi,
    address: itoPoolAddress,
    functionName: "claimRewards",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"fulfillSwap"`
 */
export const useSimulateItoPoolFulfillSwap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoPoolAbi,
    address: itoPoolAddress,
    functionName: "fulfillSwap",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"fundRewards"`
 */
export const useSimulateItoPoolFundRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoPoolAbi,
    address: itoPoolAddress,
    functionName: "fundRewards",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"removeLiquidity"`
 */
export const useSimulateItoPoolRemoveLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoPoolAbi,
    address: itoPoolAddress,
    functionName: "removeLiquidity",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoPoolAbi}__ and `functionName` set to `"swap"`
 */
export const useSimulateItoPoolSwap = /*#__PURE__*/ createUseSimulateContract({
  abi: itoPoolAbi,
  address: itoPoolAddress,
  functionName: "swap",
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoPoolAbi}__
 */
export const useWatchItoPoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: itoPoolAbi,
  address: itoPoolAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoPoolAbi}__ and `eventName` set to `"LiquidityAdded"`
 */
export const useWatchItoPoolLiquidityAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itoPoolAbi,
    address: itoPoolAddress,
    eventName: "LiquidityAdded",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoPoolAbi}__ and `eventName` set to `"LiquidityRemoved"`
 */
export const useWatchItoPoolLiquidityRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itoPoolAbi,
    address: itoPoolAddress,
    eventName: "LiquidityRemoved",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoPoolAbi}__ and `eventName` set to `"RewardsClaimed"`
 */
export const useWatchItoPoolRewardsClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itoPoolAbi,
    address: itoPoolAddress,
    eventName: "RewardsClaimed",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoPoolAbi}__ and `eventName` set to `"SwapCompleted"`
 */
export const useWatchItoPoolSwapCompletedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itoPoolAbi,
    address: itoPoolAddress,
    eventName: "SwapCompleted",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoPoolAbi}__ and `eventName` set to `"SwapInitiated"`
 */
export const useWatchItoPoolSwapInitiatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itoPoolAbi,
    address: itoPoolAddress,
    eventName: "SwapInitiated",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoRouterAbi}__
 */
export const useReadItoRouter = /*#__PURE__*/ createUseReadContract({
  abi: itoRouterAbi,
  address: itoRouterAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoRouterAbi}__ and `functionName` set to `"getPool"`
 */
export const useReadItoRouterGetPool = /*#__PURE__*/ createUseReadContract({
  abi: itoRouterAbi,
  address: itoRouterAddress,
  functionName: "getPool",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoRouterAbi}__ and `functionName` set to `"oracle"`
 */
export const useReadItoRouterOracle = /*#__PURE__*/ createUseReadContract({
  abi: itoRouterAbi,
  address: itoRouterAddress,
  functionName: "oracle",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoRouterAbi}__ and `functionName` set to `"owner"`
 */
export const useReadItoRouterOwner = /*#__PURE__*/ createUseReadContract({
  abi: itoRouterAbi,
  address: itoRouterAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoRouterAbi}__ and `functionName` set to `"poolExists"`
 */
export const useReadItoRouterPoolExists = /*#__PURE__*/ createUseReadContract({
  abi: itoRouterAbi,
  address: itoRouterAddress,
  functionName: "poolExists",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoRouterAbi}__ and `functionName` set to `"pools"`
 */
export const useReadItoRouterPools = /*#__PURE__*/ createUseReadContract({
  abi: itoRouterAbi,
  address: itoRouterAddress,
  functionName: "pools",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoRouterAbi}__ and `functionName` set to `"rewardToken"`
 */
export const useReadItoRouterRewardToken = /*#__PURE__*/ createUseReadContract({
  abi: itoRouterAbi,
  address: itoRouterAddress,
  functionName: "rewardToken",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoRouterAbi}__ and `functionName` set to `"version"`
 */
export const useReadItoRouterVersion = /*#__PURE__*/ createUseReadContract({
  abi: itoRouterAbi,
  address: itoRouterAddress,
  functionName: "version",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoRouterAbi}__
 */
export const useWriteItoRouter = /*#__PURE__*/ createUseWriteContract({
  abi: itoRouterAbi,
  address: itoRouterAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoRouterAbi}__ and `functionName` set to `"createPool"`
 */
export const useWriteItoRouterCreatePool = /*#__PURE__*/ createUseWriteContract(
  { abi: itoRouterAbi, address: itoRouterAddress, functionName: "createPool" },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoRouterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteItoRouterRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: itoRouterAbi,
    address: itoRouterAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoRouterAbi}__ and `functionName` set to `"setVersion"`
 */
export const useWriteItoRouterSetVersion = /*#__PURE__*/ createUseWriteContract(
  { abi: itoRouterAbi, address: itoRouterAddress, functionName: "setVersion" },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoRouterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteItoRouterTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: itoRouterAbi,
    address: itoRouterAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoRouterAbi}__
 */
export const useSimulateItoRouter = /*#__PURE__*/ createUseSimulateContract({
  abi: itoRouterAbi,
  address: itoRouterAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoRouterAbi}__ and `functionName` set to `"createPool"`
 */
export const useSimulateItoRouterCreatePool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoRouterAbi,
    address: itoRouterAddress,
    functionName: "createPool",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoRouterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateItoRouterRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoRouterAbi,
    address: itoRouterAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoRouterAbi}__ and `functionName` set to `"setVersion"`
 */
export const useSimulateItoRouterSetVersion =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoRouterAbi,
    address: itoRouterAddress,
    functionName: "setVersion",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoRouterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateItoRouterTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoRouterAbi,
    address: itoRouterAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoRouterAbi}__
 */
export const useWatchItoRouterEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: itoRouterAbi, address: itoRouterAddress },
);

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoRouterAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchItoRouterOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itoRouterAbi,
    address: itoRouterAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoRouterAbi}__ and `eventName` set to `"PoolCreated"`
 */
export const useWatchItoRouterPoolCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itoRouterAbi,
    address: itoRouterAddress,
    eventName: "PoolCreated",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__
 */
export const useReadItoToken = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadItoTokenDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "DOMAIN_SEPARATOR",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadItoTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "allowance",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadItoTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadItoTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "decimals",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadItoTokenEip712Domain = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "eip712Domain",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadItoTokenName = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "name",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadItoTokenNonces = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "nonces",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"owner"`
 */
export const useReadItoTokenOwner = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadItoTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "symbol",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadItoTokenTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__
 */
export const useWriteItoToken = /*#__PURE__*/ createUseWriteContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteItoTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteItoTokenBurn = /*#__PURE__*/ createUseWriteContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "burn",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useWriteItoTokenBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "burnFrom",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteItoTokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteItoTokenPermit = /*#__PURE__*/ createUseWriteContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "permit",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteItoTokenRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteItoTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "transfer",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteItoTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteItoTokenTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__
 */
export const useSimulateItoToken = /*#__PURE__*/ createUseSimulateContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateItoTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "approve",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateItoTokenBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "burn",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useSimulateItoTokenBurnFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "burnFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateItoTokenMint = /*#__PURE__*/ createUseSimulateContract({
  abi: itoTokenAbi,
  address: itoTokenAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateItoTokenPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "permit",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateItoTokenRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateItoTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "transfer",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateItoTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itoTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateItoTokenTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoTokenAbi}__
 */
export const useWatchItoTokenEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: itoTokenAbi,
  address: itoTokenAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchItoTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    eventName: "Approval",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoTokenAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchItoTokenEip712DomainChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    eventName: "EIP712DomainChanged",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoTokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchItoTokenOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itoTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchItoTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itoTokenAbi,
    address: itoTokenAddress,
    eventName: "Transfer",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__
 */
export const useReadMockEth = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadMockEthDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "DOMAIN_SEPARATOR",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadMockEthAllowance = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "allowance",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadMockEthBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadMockEthDecimals = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "decimals",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadMockEthEip712Domain = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "eip712Domain",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"name"`
 */
export const useReadMockEthName = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "name",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadMockEthNonces = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "nonces",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMockEthOwner = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadMockEthSymbol = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "symbol",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadMockEthTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__
 */
export const useWriteMockEth = /*#__PURE__*/ createUseWriteContract({
  abi: mockEthAbi,
  address: mockEthAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteMockEthApprove = /*#__PURE__*/ createUseWriteContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteMockEthBurn = /*#__PURE__*/ createUseWriteContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "burn",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useWriteMockEthBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "burnFrom",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteMockEthMint = /*#__PURE__*/ createUseWriteContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteMockEthPermit = /*#__PURE__*/ createUseWriteContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "permit",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteMockEthRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteMockEthTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "transfer",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteMockEthTransferFrom = /*#__PURE__*/ createUseWriteContract(
  { abi: mockEthAbi, address: mockEthAddress, functionName: "transferFrom" },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteMockEthTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__
 */
export const useSimulateMockEth = /*#__PURE__*/ createUseSimulateContract({
  abi: mockEthAbi,
  address: mockEthAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateMockEthApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "approve",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateMockEthBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "burn",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useSimulateMockEthBurnFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "burnFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateMockEthMint = /*#__PURE__*/ createUseSimulateContract({
  abi: mockEthAbi,
  address: mockEthAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateMockEthPermit = /*#__PURE__*/ createUseSimulateContract(
  { abi: mockEthAbi, address: mockEthAddress, functionName: "permit" },
);

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateMockEthRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateMockEthTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "transfer",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateMockEthTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockEthAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateMockEthTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockEthAbi,
    address: mockEthAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockEthAbi}__
 */
export const useWatchMockEthEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mockEthAbi,
  address: mockEthAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockEthAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchMockEthApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockEthAbi,
    address: mockEthAddress,
    eventName: "Approval",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockEthAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchMockEthEip712DomainChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockEthAbi,
    address: mockEthAddress,
    eventName: "EIP712DomainChanged",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockEthAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchMockEthOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockEthAbi,
    address: mockEthAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockEthAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchMockEthTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockEthAbi,
    address: mockEthAddress,
    eventName: "Transfer",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockOracleAbi}__
 */
export const useReadMockOracle = /*#__PURE__*/ createUseReadContract({
  abi: mockOracleAbi,
  address: mockOracleAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockOracleAbi}__ and `functionName` set to `"getPrice"`
 */
export const useReadMockOracleGetPrice = /*#__PURE__*/ createUseReadContract({
  abi: mockOracleAbi,
  address: mockOracleAddress,
  functionName: "getPrice",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockOracleAbi}__ and `functionName` set to `"getVolatility"`
 */
export const useReadMockOracleGetVolatility =
  /*#__PURE__*/ createUseReadContract({
    abi: mockOracleAbi,
    address: mockOracleAddress,
    functionName: "getVolatility",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockOracleAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMockOracleOwner = /*#__PURE__*/ createUseReadContract({
  abi: mockOracleAbi,
  address: mockOracleAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockOracleAbi}__ and `functionName` set to `"price"`
 */
export const useReadMockOraclePrice = /*#__PURE__*/ createUseReadContract({
  abi: mockOracleAbi,
  address: mockOracleAddress,
  functionName: "price",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockOracleAbi}__ and `functionName` set to `"volatility"`
 */
export const useReadMockOracleVolatility = /*#__PURE__*/ createUseReadContract({
  abi: mockOracleAbi,
  address: mockOracleAddress,
  functionName: "volatility",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockOracleAbi}__
 */
export const useWriteMockOracle = /*#__PURE__*/ createUseWriteContract({
  abi: mockOracleAbi,
  address: mockOracleAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockOracleAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteMockOracleRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockOracleAbi,
    address: mockOracleAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockOracleAbi}__ and `functionName` set to `"setPrice"`
 */
export const useWriteMockOracleSetPrice = /*#__PURE__*/ createUseWriteContract({
  abi: mockOracleAbi,
  address: mockOracleAddress,
  functionName: "setPrice",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockOracleAbi}__ and `functionName` set to `"setPriceAndVolatility"`
 */
export const useWriteMockOracleSetPriceAndVolatility =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockOracleAbi,
    address: mockOracleAddress,
    functionName: "setPriceAndVolatility",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockOracleAbi}__ and `functionName` set to `"setVolatility"`
 */
export const useWriteMockOracleSetVolatility =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockOracleAbi,
    address: mockOracleAddress,
    functionName: "setVolatility",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockOracleAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteMockOracleTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockOracleAbi,
    address: mockOracleAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockOracleAbi}__
 */
export const useSimulateMockOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: mockOracleAbi,
  address: mockOracleAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockOracleAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateMockOracleRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockOracleAbi,
    address: mockOracleAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockOracleAbi}__ and `functionName` set to `"setPrice"`
 */
export const useSimulateMockOracleSetPrice =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockOracleAbi,
    address: mockOracleAddress,
    functionName: "setPrice",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockOracleAbi}__ and `functionName` set to `"setPriceAndVolatility"`
 */
export const useSimulateMockOracleSetPriceAndVolatility =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockOracleAbi,
    address: mockOracleAddress,
    functionName: "setPriceAndVolatility",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockOracleAbi}__ and `functionName` set to `"setVolatility"`
 */
export const useSimulateMockOracleSetVolatility =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockOracleAbi,
    address: mockOracleAddress,
    functionName: "setVolatility",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockOracleAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateMockOracleTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockOracleAbi,
    address: mockOracleAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockOracleAbi}__
 */
export const useWatchMockOracleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockOracleAbi,
    address: mockOracleAddress,
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockOracleAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchMockOracleOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockOracleAbi,
    address: mockOracleAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__
 */
export const useReadMockUsdc = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadMockUsdcDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "DOMAIN_SEPARATOR",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadMockUsdcAllowance = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "allowance",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadMockUsdcBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadMockUsdcDecimals = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "decimals",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadMockUsdcEip712Domain = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "eip712Domain",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"name"`
 */
export const useReadMockUsdcName = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "name",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadMockUsdcNonces = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "nonces",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMockUsdcOwner = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadMockUsdcSymbol = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "symbol",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadMockUsdcTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__
 */
export const useWriteMockUsdc = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteMockUsdcApprove = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteMockUsdcBurn = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "burn",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useWriteMockUsdcBurnFrom = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "burnFrom",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteMockUsdcMint = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteMockUsdcPermit = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "permit",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteMockUsdcRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteMockUsdcTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "transfer",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteMockUsdcTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteMockUsdcTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__
 */
export const useSimulateMockUsdc = /*#__PURE__*/ createUseSimulateContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateMockUsdcApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "approve",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateMockUsdcBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "burn",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useSimulateMockUsdcBurnFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "burnFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateMockUsdcMint = /*#__PURE__*/ createUseSimulateContract({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateMockUsdcPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "permit",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateMockUsdcRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateMockUsdcTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "transfer",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateMockUsdcTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockUsdcAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateMockUsdcTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockUsdcAbi}__
 */
export const useWatchMockUsdcEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: mockUsdcAbi,
  address: mockUsdcAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockUsdcAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchMockUsdcApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    eventName: "Approval",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockUsdcAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchMockUsdcEip712DomainChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    eventName: "EIP712DomainChanged",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockUsdcAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchMockUsdcOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockUsdcAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchMockUsdcTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockUsdcAbi,
    address: mockUsdcAddress,
    eventName: "Transfer",
  });
