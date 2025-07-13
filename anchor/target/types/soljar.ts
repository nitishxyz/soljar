/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/soljar.json`.
 */
export type Soljar = {
  "address": "JARSq9S9RgyynuAwcdWh2yEG6MbhfntWq7zjXjAo87uQ",
  "metadata": {
    "name": "soljar",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createDeposit",
      "discriminator": [
        157,
        30,
        11,
        129,
        16,
        166,
        115,
        75
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tipLink",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  105,
                  112,
                  95,
                  108,
                  105,
                  110,
                  107
                ]
              },
              {
                "kind": "arg",
                "path": "tipLinkId"
              }
            ]
          }
        },
        {
          "name": "jar",
          "writable": true,
          "relations": [
            "tipLink"
          ]
        },
        {
          "name": "deposit",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  101,
                  112,
                  111,
                  115,
                  105,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "jar"
              },
              {
                "kind": "account",
                "path": "jar.deposit_count",
                "account": "jar"
              }
            ]
          }
        },
        {
          "name": "supporterIndex",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  117,
                  112,
                  112,
                  111,
                  114,
                  116,
                  101,
                  114,
                  95,
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              },
              {
                "kind": "account",
                "path": "jar"
              },
              {
                "kind": "account",
                "path": "jar.supporter_index",
                "account": "jar"
              }
            ]
          }
        },
        {
          "name": "supporter",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  117,
                  112,
                  112,
                  111,
                  114,
                  116,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "jar"
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tipLinkId",
          "type": "string"
        },
        {
          "name": "referrer",
          "type": "string"
        },
        {
          "name": "memo",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createSplDeposit",
      "discriminator": [
        101,
        42,
        125,
        13,
        104,
        16,
        50,
        48
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tipLink",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  105,
                  112,
                  95,
                  108,
                  105,
                  110,
                  107
                ]
              },
              {
                "kind": "arg",
                "path": "tipLinkId"
              }
            ]
          }
        },
        {
          "name": "jar",
          "writable": true,
          "relations": [
            "tipLink"
          ]
        },
        {
          "name": "deposit",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  101,
                  112,
                  111,
                  115,
                  105,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "jar"
              },
              {
                "kind": "account",
                "path": "jar.deposit_count",
                "account": "jar"
              }
            ]
          }
        },
        {
          "name": "mint"
        },
        {
          "name": "tokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "jar"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "sourceTokenAccount",
          "writable": true
        },
        {
          "name": "supporterIndex",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  117,
                  112,
                  112,
                  111,
                  114,
                  116,
                  101,
                  114,
                  95,
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              },
              {
                "kind": "account",
                "path": "jar"
              },
              {
                "kind": "account",
                "path": "jar.supporter_index",
                "account": "jar"
              }
            ]
          }
        },
        {
          "name": "supporter",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  117,
                  112,
                  112,
                  111,
                  114,
                  116,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "jar"
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": [
        {
          "name": "tipLinkId",
          "type": "string"
        },
        {
          "name": "referrer",
          "type": "string"
        },
        {
          "name": "memo",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createSupporterIndex",
      "discriminator": [
        29,
        115,
        162,
        147,
        43,
        70,
        81,
        126
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "jar",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  106,
                  97,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "supporterIndex",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  117,
                  112,
                  112,
                  111,
                  114,
                  116,
                  101,
                  114,
                  95,
                  105,
                  110,
                  100,
                  101,
                  120
                ]
              },
              {
                "kind": "account",
                "path": "jar"
              },
              {
                "kind": "arg",
                "path": "index"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "index",
          "type": "u32"
        }
      ]
    },
    {
      "name": "createUser",
      "discriminator": [
        108,
        227,
        130,
        130,
        252,
        109,
        75,
        218
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "user",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "userByName",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "username"
              }
            ]
          }
        },
        {
          "name": "jar",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  106,
                  97,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "tipLink",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  105,
                  112,
                  95,
                  108,
                  105,
                  110,
                  107
                ]
              },
              {
                "kind": "arg",
                "path": "username"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        }
      ]
    },
    {
      "name": "createWithdrawl",
      "discriminator": [
        11,
        89,
        236,
        15,
        11,
        223,
        1,
        67
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "jar",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  106,
                  97,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "withdrawl",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  105,
                  116,
                  104,
                  100,
                  114,
                  97,
                  119,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "jar"
              },
              {
                "kind": "account",
                "path": "jar.withdrawl_count",
                "account": "jar"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "currencyMint",
          "type": "pubkey"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "deposit",
      "discriminator": [
        242,
        35,
        198,
        137,
        82,
        225,
        242,
        182
      ],
      "accounts": [
        {
          "name": "depositor",
          "docs": [
            "The depositor making the payment"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "jarById",
          "docs": [
            "The jar_by_id mapping to find the jar"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  106,
                  97,
                  114,
                  95,
                  98,
                  121,
                  95,
                  105,
                  100,
                  95,
                  118,
                  50
                ]
              },
              {
                "kind": "arg",
                "path": "jarId"
              }
            ]
          }
        },
        {
          "name": "account",
          "docs": [
            "The account that owns the jar"
          ],
          "relations": [
            "jarById"
          ]
        },
        {
          "name": "jar",
          "docs": [
            "The jar receiving the deposit"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  106,
                  97,
                  114,
                  95,
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "jar_by_id.account",
                "account": "jarByIdV2"
              },
              {
                "kind": "account",
                "path": "jar_by_id.jar_number",
                "account": "jarByIdV2"
              }
            ]
          }
        },
        {
          "name": "deposit",
          "docs": [
            "The deposit record"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  101,
                  112,
                  111,
                  115,
                  105,
                  116,
                  95,
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "jar"
              },
              {
                "kind": "account",
                "path": "jar.deposit_count",
                "account": "jarV2"
              }
            ]
          }
        },
        {
          "name": "vault",
          "docs": [
            "The vault for holding funds"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "account"
              }
            ]
          }
        },
        {
          "name": "mint",
          "docs": [
            "USDC mint account"
          ]
        },
        {
          "name": "depositorTokenAccount",
          "docs": [
            "Depositor's USDC token account"
          ],
          "writable": true
        },
        {
          "name": "vaultTokenAccount",
          "docs": [
            "Vault's USDC token account (created during setup)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "System program"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token program"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated token program"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "jarId",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "invoiceId",
          "type": {
            "option": "u32"
          }
        }
      ]
    },
    {
      "name": "executeTransaction",
      "discriminator": [
        231,
        173,
        49,
        91,
        235,
        24,
        68,
        19
      ],
      "accounts": [
        {
          "name": "account",
          "docs": [
            "The account that owns the vault"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  95,
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "account.owner",
                "account": "accountV2"
              }
            ]
          }
        },
        {
          "name": "vault",
          "docs": [
            "The vault PDA that acts as the smart wallet signer for transactions"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "account"
              }
            ]
          }
        },
        {
          "name": "owner",
          "docs": [
            "The owner of the account (must be signer)"
          ],
          "signer": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "System program for CPI calls"
          ],
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "instructions",
          "type": {
            "vec": {
              "defined": {
                "name": "transactionInstruction"
              }
            }
          }
        }
      ]
    },
    {
      "name": "setupAccount",
      "discriminator": [
        252,
        180,
        230,
        167,
        170,
        17,
        238,
        56
      ],
      "accounts": [
        {
          "name": "owner",
          "docs": [
            "The owner/creator of the account (must be signer)"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "paymaster",
          "docs": [
            "The paymaster for account creation (can be same as owner)"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "account",
          "docs": [
            "The main AccountV2 PDA"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  95,
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "jar",
          "docs": [
            "The first jar (jar number 0)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  106,
                  97,
                  114,
                  95,
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "account"
              },
              {
                "kind": "const",
                "value": [
                  0
                ]
              }
            ]
          }
        },
        {
          "name": "jarById",
          "docs": [
            "The jar_by_id mapping for global uniqueness"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  106,
                  97,
                  114,
                  95,
                  98,
                  121,
                  95,
                  105,
                  100,
                  95,
                  118,
                  50
                ]
              },
              {
                "kind": "arg",
                "path": "jarId"
              }
            ]
          }
        },
        {
          "name": "vault",
          "docs": [
            "The vault PDA for holding funds (derived but not initialized as an account)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "account"
              }
            ]
          }
        },
        {
          "name": "usdcMint",
          "docs": [
            "USDC mint account"
          ]
        },
        {
          "name": "vaultUsdcAccount",
          "docs": [
            "Vault's USDC token account (created during setup)"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "usdcMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "systemProgram",
          "docs": [
            "System program for account creation"
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token program for token operations"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated token program for creating token accounts"
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "jarId",
          "type": "string"
        },
        {
          "name": "defaultCurrencyId",
          "type": {
            "option": "u8"
          }
        }
      ]
    },
    {
      "name": "withdrawSplTokens",
      "discriminator": [
        30,
        150,
        152,
        52,
        225,
        67,
        73,
        69
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "jar",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  106,
                  97,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "withdrawl",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  105,
                  116,
                  104,
                  100,
                  114,
                  97,
                  119,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "jar"
              },
              {
                "kind": "account",
                "path": "jar.withdrawl_count",
                "account": "jar"
              }
            ]
          }
        },
        {
          "name": "mint"
        },
        {
          "name": "tokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "jar"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "associatedTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "accountV2",
      "discriminator": [
        81,
        219,
        132,
        77,
        5,
        44,
        24,
        91
      ]
    },
    {
      "name": "deposit",
      "discriminator": [
        148,
        146,
        121,
        66,
        207,
        173,
        21,
        227
      ]
    },
    {
      "name": "depositV2",
      "discriminator": [
        113,
        199,
        120,
        239,
        17,
        187,
        28,
        196
      ]
    },
    {
      "name": "jar",
      "discriminator": [
        197,
        50,
        234,
        142,
        247,
        216,
        114,
        137
      ]
    },
    {
      "name": "jarByIdV2",
      "discriminator": [
        73,
        52,
        33,
        54,
        103,
        70,
        116,
        77
      ]
    },
    {
      "name": "jarV2",
      "discriminator": [
        28,
        84,
        83,
        157,
        82,
        124,
        249,
        63
      ]
    },
    {
      "name": "supporter",
      "discriminator": [
        198,
        125,
        73,
        94,
        72,
        40,
        233,
        159
      ]
    },
    {
      "name": "supporterIndex",
      "discriminator": [
        89,
        202,
        10,
        80,
        80,
        123,
        176,
        198
      ]
    },
    {
      "name": "tipLink",
      "discriminator": [
        197,
        93,
        252,
        135,
        16,
        11,
        146,
        202
      ]
    },
    {
      "name": "user",
      "discriminator": [
        159,
        117,
        95,
        227,
        239,
        151,
        58,
        236
      ]
    },
    {
      "name": "userByName",
      "discriminator": [
        166,
        9,
        56,
        163,
        76,
        235,
        143,
        10
      ]
    },
    {
      "name": "withdrawl",
      "discriminator": [
        39,
        119,
        9,
        87,
        192,
        193,
        129,
        150
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "overflow",
      "msg": "overflow"
    },
    {
      "code": 6001,
      "name": "noChanges",
      "msg": "noChangesDetected"
    },
    {
      "code": 6002,
      "name": "usernameTooLong",
      "msg": "usernameTooLong"
    },
    {
      "code": 6003,
      "name": "usernameAlreadyTaken",
      "msg": "usernameAlreadyTaken"
    },
    {
      "code": 6004,
      "name": "amountOverflow",
      "msg": "Amount overflow occurred"
    },
    {
      "code": 6005,
      "name": "tipCountOverflow",
      "msg": "Tip count overflow occurred"
    },
    {
      "code": 6006,
      "name": "indexOverflow",
      "msg": "Index overflow occurred"
    },
    {
      "code": 6007,
      "name": "totalSupportersOverflow",
      "msg": "Total supporters overflow occurred"
    },
    {
      "code": 6008,
      "name": "pageOverflow",
      "msg": "Page number overflow occurred"
    },
    {
      "code": 6009,
      "name": "supporterIndexFull",
      "msg": "Supporter index is full"
    },
    {
      "code": 6010,
      "name": "invalidAmount",
      "msg": "Amount must be greater than 0"
    },
    {
      "code": 6011,
      "name": "userCountOverflow",
      "msg": "User count overflow occurred"
    },
    {
      "code": 6012,
      "name": "invalidIndexPage",
      "msg": "Invalid index page"
    },
    {
      "code": 6013,
      "name": "tooManyTipLinks",
      "msg": "Too many tip links"
    },
    {
      "code": 6014,
      "name": "invalidIdLength",
      "msg": "Invalid ID length"
    },
    {
      "code": 6015,
      "name": "invalidDescriptionLength",
      "msg": "Invalid description length"
    },
    {
      "code": 6016,
      "name": "tipLinkCountOverflow",
      "msg": "Tip link count overflow"
    },
    {
      "code": 6017,
      "name": "referrerTooLong",
      "msg": "Referrer string too long"
    },
    {
      "code": 6018,
      "name": "memoTooLong",
      "msg": "Memo string too long"
    },
    {
      "code": 6019,
      "name": "tooManyDeposits",
      "msg": "Too many deposits in index"
    },
    {
      "code": 6020,
      "name": "insufficientFundsInJar",
      "msg": "Insufficient funds in jar"
    },
    {
      "code": 6021,
      "name": "tooManyWithdrawls",
      "msg": "Too many withdrawls in index"
    },
    {
      "code": 6022,
      "name": "arithmeticOverflow",
      "msg": "Arithmetic overflow"
    },
    {
      "code": 6023,
      "name": "insufficientSolBalance",
      "msg": "Insufficient SOL balance"
    },
    {
      "code": 6024,
      "name": "insufficientTokenBalance",
      "msg": "Insufficient token balance"
    },
    {
      "code": 6025,
      "name": "invalidTokenMint",
      "msg": "Invalid token mint"
    },
    {
      "code": 6026,
      "name": "maxCurrenciesReached",
      "msg": "Max currencies reached"
    },
    {
      "code": 6027,
      "name": "unsupportedCurrency",
      "msg": "Unsupported currency"
    },
    {
      "code": 6028,
      "name": "invalidCurrencyMint",
      "msg": "Invalid currency mint"
    },
    {
      "code": 6029,
      "name": "depositCountOverflow",
      "msg": "Deposit count overflow"
    },
    {
      "code": 6030,
      "name": "withdrawlCountOverflow",
      "msg": "Withdrawl count overflow"
    },
    {
      "code": 6031,
      "name": "supporterCountOverflow",
      "msg": "Supporter count overflow"
    },
    {
      "code": 6032,
      "name": "usernameNotAllowed",
      "msg": "This username is not allowed"
    },
    {
      "code": 6033,
      "name": "invalidUsernameFormat",
      "msg": "Username can only contain alphanumeric characters and underscores"
    },
    {
      "code": 6034,
      "name": "usernameMustBeLowercase",
      "msg": "Username must be lowercase"
    },
    {
      "code": 6035,
      "name": "tipLinkIdMustBeLowercase",
      "msg": "Tip link ID must be lowercase"
    },
    {
      "code": 6036,
      "name": "invalidDeposit",
      "msg": "Invalid deposit"
    },
    {
      "code": 6037,
      "name": "missingAccountInfo",
      "msg": "Missing account info"
    },
    {
      "code": 6038,
      "name": "supporterAccountNotInitialized",
      "msg": "Supporter account not initialized"
    },
    {
      "code": 6039,
      "name": "depositAlreadyHasSigner",
      "msg": "Deposit already has a signer"
    },
    {
      "code": 6040,
      "name": "jarCountOverflow",
      "msg": "Jar count overflow"
    },
    {
      "code": 6041,
      "name": "withdrawalCountOverflow",
      "msg": "Withdrawal count overflow"
    },
    {
      "code": 6042,
      "name": "invoiceCountOverflow",
      "msg": "Invoice count overflow"
    },
    {
      "code": 6043,
      "name": "jarIdAlreadyExists",
      "msg": "Jar ID already exists"
    },
    {
      "code": 6044,
      "name": "invoiceAlreadyPaid",
      "msg": "Invoice already paid"
    },
    {
      "code": 6045,
      "name": "invoiceExpired",
      "msg": "Invoice expired"
    },
    {
      "code": 6046,
      "name": "invalidJarIdFormat",
      "msg": "Invalid jar ID format"
    },
    {
      "code": 6047,
      "name": "jarNotFound",
      "msg": "Jar not found"
    },
    {
      "code": 6048,
      "name": "invoiceNotFound",
      "msg": "Invoice not found"
    },
    {
      "code": 6049,
      "name": "jarInactive",
      "msg": "Jar is inactive"
    },
    {
      "code": 6050,
      "name": "currencyNotSupported",
      "msg": "Currency not supported by vault"
    }
  ],
  "types": [
    {
      "name": "accountV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "defaultJarNumber",
            "type": "u8"
          },
          {
            "name": "defaultCurrencyId",
            "type": "u8"
          },
          {
            "name": "jarCount",
            "type": "u32"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "updatedAt",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "deposit",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signer",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "linkId",
            "type": "string"
          },
          {
            "name": "currency",
            "type": "u8"
          },
          {
            "name": "memo",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "depositV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "depositor",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "currencyMint",
            "type": "pubkey"
          },
          {
            "name": "invoiceId",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "jar",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "depositCount",
            "type": "u32"
          },
          {
            "name": "withdrawlCount",
            "type": "u32"
          },
          {
            "name": "supporterCount",
            "type": "u32"
          },
          {
            "name": "supporterIndex",
            "type": "u32"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "updatedAt",
            "type": "i64"
          },
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "jarByIdV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "jarIdTaken",
            "type": "bool"
          },
          {
            "name": "account",
            "type": "pubkey"
          },
          {
            "name": "jarNumber",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "jarV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "jarNumber",
            "type": "u8"
          },
          {
            "name": "jarId",
            "type": "string"
          },
          {
            "name": "depositCount",
            "type": "u32"
          },
          {
            "name": "invoiceCount",
            "type": "u32"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "supporter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signer",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "tipCount",
            "type": "u16"
          },
          {
            "name": "tips",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "tipInfo"
                  }
                },
                4
              ]
            }
          },
          {
            "name": "activeTips",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "supporterIndex",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalItems",
            "type": "u8"
          },
          {
            "name": "supporters",
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "tipInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "currency",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "tipLink",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "jar",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "transactionInstruction",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "programId",
            "type": "pubkey"
          },
          {
            "name": "data",
            "type": "bytes"
          },
          {
            "name": "accountIndices",
            "type": "bytes"
          },
          {
            "name": "accountWriteFlags",
            "type": {
              "vec": "bool"
            }
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "jar",
            "type": "pubkey"
          },
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "updatedAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "userByName",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "usernameTaken",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "withdrawl",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "jar",
            "type": "pubkey"
          },
          {
            "name": "currency",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    }
  ]
};
