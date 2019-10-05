import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as d3 from "d3";
//import tree from './data/classification.json';

const useStyles = makeStyles(theme => ({
    dendroMenu:
    {
        // backgroundColor:'#c4f'
    },
    nodecircle: {
        fill: '#fff',
        stroke: '#4682b4',
        strokeWidth: 3,
    },

    nodetext: {
        fontSize: 12,
    },

    link: {
        fill: 'none',
        stroke: '#ccc',
        strokeWidth: 2,
    }
}));

var treeData =
{
    "name": "PK",
    "children": [{
        "id": "id1@",
        "name": "",
        "protein": "",
        "path": "PK.png",
        "members": [
            "AAK1",
            "ABL1",
            "ABL2",
            "ABR",
            "ACK",
            "ACTR2",
            "ACTR2B",
            "ADCK1",
            "ADCK2",
            "ADCK3",
            "ADCK4",
            "ADCK5",
            "AKT1",
            "AKT2",
            "AKT3",
            "ALK",
            "ALK1",
            "ALK2",
            "ALK4",
            "ALK7",
            "AMPKa1",
            "AMPKa2",
            "ANKRD3",
            "ANPa",
            "ANPb",
            "ARAF",
            "ATM",
            "ATR",
            "AXL",
            "AlphaK1",
            "AlphaK2",
            "AlphaK3",
            "AurA",
            "AurB",
            "AurC",
            "BARK1",
            "BARK2",
            "BAZ1A",
            "BAZ1B",
            "BCKDK",
            "BCR",
            "BIKE",
            "BLK",
            "BLVRA",
            "BMPR1A",
            "BMPR1B",
            "BMPR2",
            "BMX",
            "BRAF",
            "BRD2",
            "BRD3",
            "BRD4",
            "BRDT",
            "BRK",
            "BRSK1",
            "BRSK2",
            "BTK",
            "BUB1",
            "BUBR1",
            "CASK",
            "CCK4",
            "CCRK",
            "CDC2",
            "CDC7",
            "CDK10",
            "CDK11",
            "CDK2",
            "CDK3",
            "CDK4",
            "CDK5",
            "CDK6",
            "CDK7",
            "CDK8",
            "CDK9",
            "CDKL1",
            "CDKL2",
            "CDKL3",
            "CDKL4",
            "CDKL5",
            "CHED",
            "CHK1",
            "CHK2",
            "CK1a",
            "CK1a2",
            "CK1d",
            "CK1e",
            "CK1g1",
            "CK1g2",
            "CK1g3",
            "CK2a1",
            "CK2a2",
            "CLIK1",
            "CLIK1L",
            "CLK1",
            "CLK2",
            "CLK3",
            "CLK4",
            "COT",
            "CRIK",
            "CRK7",
            "CSK",
            "CTK",
            "CYGD",
            "CYGF",
            "CaMK1a",
            "CaMK1b",
            "CaMK1d",
            "CaMK1g",
            "CaMK2a",
            "CaMK2b",
            "CaMK2d",
            "CaMK2g",
            "CaMK4",
            "CaMKK1",
            "CaMKK2",
            "ChaK1",
            "ChaK2",
            "Col4A3BP",
            "DAPK1",
            "DAPK2",
            "DAPK3",
            "DCAMKL1",
            "DCAMKL2",
            "DCAMKL3",
            "DDR1",
            "DDR2",
            "DLK",
            "DMPK1",
            "DMPK2",
            "DNAPK",
            "DRAK1",
            "DRAK2",
            "DYRK1A",
            "DYRK1B",
            "DYRK2",
            "DYRK3",
            "DYRK4",
            "EGFR",
            "EphA1",
            "EphA10",
            "EphA2",
            "EphA3",
            "EphA4",
            "EphA5",
            "EphA6",
            "EphA7",
            "EphA8",
            "EphB1",
            "EphB2",
            "EphB3",
            "EphB4",
            "EphB6",
            "ErbB2",
            "ErbB3",
            "ErbB4",
            "Erk1",
            "Erk2",
            "Erk3",
            "Erk4",
            "Erk5",
            "Erk7",
            "FAK",
            "FASTK",
            "FER",
            "FES",
            "FGFR1",
            "FGFR2",
            "FGFR3",
            "FGFR4",
            "FGR",
            "FLT1",
            "FLT3",
            "FLT4",
            "FMS",
            "FRAP",
            "FRK",
            "FYN",
            "Fused",
            "G11",
            "GAK",
            "GCK",
            "GCN2",
            "GCN2_b",
            "GPRK4",
            "GPRK5",
            "GPRK6",
            "GPRK7",
            "GSK3A",
            "GSK3B",
            "GTF2F1",
            "HCK",
            "HGK",
            "HH498",
            "HIPK1",
            "HIPK2",
            "HIPK3",
            "HIPK4",
            "HPK1",
            "HRI",
            "HSER",
            "HUNK",
            "Haspin",
            "ICK",
            "IGF1R",
            "IKKa",
            "IKKb",
            "IKKe",
            "ILK",
            "INSR",
            "IRAK1",
            "IRAK2",
            "IRAK3",
            "IRAK4",
            "IRE1",
            "IRE2",
            "IRR",
            "ITK",
            "JAK1",
            "JAK1_b",
            "JAK2",
            "JAK2_b",
            "JAK3",
            "JAK3_b",
            "JNK1",
            "JNK2",
            "JNK3",
            "KDR",
            "KHS1",
            "KHS2",
            "KIS",
            "KIT",
            "KSR1",
            "KSR2",
            "LATS1",
            "LATS2",
            "LCK",
            "LIMK1",
            "LIMK2",
            "LKB1",
            "LMR1",
            "LMR2",
            "LMR3",
            "LOK",
            "LRRK1",
            "LRRK2",
            "LTK",
            "LYN",
            "LZK",
            "MAK",
            "MAP2K1",
            "MAP2K2",
            "MAP2K3",
            "MAP2K4",
            "MAP2K5",
            "MAP2K6",
            "MAP2K7",
            "MAP3K1",
            "MAP3K19",
            "MAP3K2",
            "MAP3K3",
            "MAP3K4",
            "MAP3K5",
            "MAP3K6",
            "MAP3K7",
            "MAPKAPK2",
            "MAPKAPK3",
            "MAPKAPK5",
            "MARK1",
            "MARK2",
            "MARK3",
            "MARK4",
            "MAST1",
            "MAST2",
            "MAST3",
            "MAST4",
            "MASTL",
            "MELK",
            "MER",
            "MET",
            "MINK",
            "MISR2",
            "MLK1",
            "MLK2",
            "MLK3",
            "MLK4",
            "MLKL",
            "MNK1",
            "MNK2",
            "MOK",
            "MOS",
            "MPSK1",
            "MRCKa",
            "MRCKb",
            "MSK1",
            "MSK1_b",
            "MSK2",
            "MSK2_b",
            "MSSK1",
            "MST1",
            "MST2",
            "MST3",
            "MST4",
            "MUSK",
            "MYO3A",
            "MYO3B",
            "MYT1",
            "NDR1",
            "NDR2",
            "NEK1",
            "NEK10",
            "NEK11",
            "NEK2",
            "NEK3",
            "NEK4",
            "NEK5",
            "NEK6",
            "NEK7",
            "NEK8",
            "NEK9",
            "NIK",
            "NIM1",
            "NLK",
            "NRBP1",
            "NRBP2",
            "NRK",
            "NuaK1",
            "NuaK2",
            "OSR1",
            "Obscn",
            "Obscn_b",
            "PAK1",
            "PAK2",
            "PAK3",
            "PAK4",
            "PAK5",
            "PAK6",
            "PAN3",
            "PASK",
            "PBK",
            "PCTAIRE1",
            "PCTAIRE2",
            "PCTAIRE3",
            "PDGFRa",
            "PDGFRb",
            "PDHK1",
            "PDHK2",
            "PDHK3",
            "PDHK4",
            "PDK1",
            "PEK",
            "PFTAIRE1",
            "PFTAIRE2",
            "PHKg1",
            "PHKg2",
            "PIK3R4",
            "PIM1",
            "PIM2",
            "PIM3",
            "PINK1",
            "PITSLRE",
            "PKACa",
            "PKACb",
            "PKACg",
            "PKCa",
            "PKCb",
            "PKCd",
            "PKCe",
            "PKCg",
            "PKCh",
            "PKCi",
            "PKCt",
            "PKCz",
            "PKD1",
            "PKD2",
            "PKD3",
            "PKG1",
            "PKG2",
            "PKN1",
            "PKN2",
            "PKN3",
            "PKR",
            "PLK1",
            "PLK2",
            "PLK3",
            "PLK4",
            "PRKX",
            "PRKY",
            "PRP4",
            "PRPK",
            "PSKH1",
            "PSKH2",
            "PYK2",
            "QIK",
            "QSK",
            "RAF1",
            "RET",
            "RHOK",
            "RIOK1",
            "RIOK2",
            "RIOK3",
            "RIPK1",
            "RIPK2",
            "RIPK3",
            "RNAseL",
            "ROCK1",
            "ROCK2",
            "RON",
            "ROR1",
            "ROR2",
            "ROS",
            "RSK1",
            "RSK1_b",
            "RSK2",
            "RSK2_b",
            "RSK3",
            "RSK3_b",
            "RSK4",
            "RSK4_b",
            "RSKL1",
            "RSKL2",
            "RYK",
            "SBK",
            "SCYL1",
            "SCYL2",
            "SCYL3",
            "SGK1",
            "SGK2",
            "SGK3",
            "SIK",
            "SLK",
            "SMG1",
            "SNRK",
            "SPEG",
            "SPEG_b",
            "SRC",
            "SRM",
            "SRPK1",
            "SRPK2",
            "SSTK",
            "STK33",
            "STLK3",
            "STLK5",
            "STLK6",
            "SYK",
            "SgK069",
            "SgK071",
            "SgK085",
            "SgK110",
            "SgK196",
            "SgK223",
            "SgK269",
            "SgK288",
            "SgK307",
            "SgK396",
            "SgK424",
            "SgK493",
            "SgK494",
            "SgK495",
            "SgK496",
            "Slob",
            "SuRTK106",
            "TAF1",
            "TAF1L",
            "TAK1",
            "TAO1",
            "TAO2",
            "TAO3",
            "TBCK",
            "TBK1",
            "TEC",
            "TESK1",
            "TESK2",
            "TGFbR1",
            "TGFbR2",
            "TIE1",
            "TIE2",
            "TIF1D",
            "TIF1a",
            "TIF1b",
            "TIF1g",
            "TLK1",
            "TLK2",
            "TNIK",
            "TNK1",
            "TRKA",
            "TRKB",
            "TRKC",
            "TRRAP",
            "TSSK1",
            "TSSK2",
            "TSSK3",
            "TSSK4",
            "TTBK1",
            "TTBK2",
            "TTK",
            "TTN",
            "TXK",
            "TYK2",
            "TYK2_b",
            "TYRO3",
            "Trad",
            "Trb1",
            "Trb2",
            "Trb3",
            "Trio",
            "ULK1",
            "ULK2",
            "ULK3",
            "ULK4",
            "VACAMKL",
            "VRK1",
            "VRK2",
            "VRK3",
            "Wee1",
            "Wee1B",
            "Wnk1",
            "Wnk2",
            "Wnk3",
            "Wnk4",
            "YANK1",
            "YANK2",
            "YANK3",
            "YES",
            "YSK1",
            "ZAK",
            "ZAP70",
            "caMLCK",
            "eEF2K",
            "p38a",
            "p38b",
            "p38d",
            "p38g",
            "p70S6K",
            "p70S6Kb",
            "skMLCK",
            "smMLCK"
        ],
        "children": []
    },
    {
        "id": "id2@AGC",
        "name": "AGC",
        "protein": "",
        "path": "PK_AGC.png",
        "members": [
            "AKT1",
            "AKT2",
            "AKT3",
            "BARK1",
            "BARK2",
            "CRIK",
            "DMPK1",
            "DMPK2",
            "GPRK4",
            "GPRK5",
            "GPRK6",
            "GPRK7",
            "LATS1",
            "LATS2",
            "MAST1",
            "MAST2",
            "MAST3",
            "MAST4",
            "MASTL",
            "MRCKa",
            "MRCKb",
            "MSK1",
            "MSK2",
            "NDR1",
            "NDR2",
            "PDK1",
            "PKACa",
            "PKACb",
            "PKACg",
            "PKCa",
            "PKCb",
            "PKCd",
            "PKCe",
            "PKCg",
            "PKCh",
            "PKCi",
            "PKCt",
            "PKCz",
            "PKG1",
            "PKG2",
            "PKN1",
            "PKN2",
            "PKN3",
            "PRKX",
            "PRKY",
            "RHOK",
            "ROCK1",
            "ROCK2",
            "RSK1",
            "RSK2",
            "RSK3",
            "RSK4",
            "RSKL1",
            "RSKL2",
            "SGK1",
            "SGK2",
            "SGK3",
            "SgK494",
            "YANK1",
            "YANK2",
            "YANK3",
            "p70S6K",
            "p70S6Kb"
        ],
        "children": [{
            "id": "id245@Akt",
            "name": "Akt",
            "protein": "",
            "path": "PK_AGC_Akt.png",
            "members": [
                "AKT1",
                "AKT2",
                "AKT3"
            ],
            "children": []
        },
        {
            "id": "id246@DMPK",
            "name": "DMPK",
            "protein": "",
            "path": "PK_AGC_DMPK.png",
            "members": [
                "CRIK",
                "DMPK1",
                "DMPK2",
                "MRCKa",
                "MRCKb",
                "ROCK1",
                "ROCK2"
            ],
            "children": [{
                "id": "id489@GEK",
                "name": "GEK",
                "members": [
                    "DMPK1",
                    "DMPK2",
                    "MRCKa",
                    "MRCKb"
                ],
                "path": "PK_AGC_DMPK_GEK.png"
            },
            {
                "id": "id490@ROCK",
                "name": "ROCK",
                "members": [
                    "ROCK1",
                    "ROCK2"
                ],
                "path": "PK_AGC_DMPK_ROCK.png"
            }
            ]
        },
        {
            "id": "id249@GRK",
            "name": "GRK",
            "protein": "",
            "path": "PK_AGC_GRK.png",
            "members": [
                "BARK1",
                "BARK2",
                "GPRK4",
                "GPRK5",
                "GPRK6",
                "GPRK7",
                "RHOK"
            ],
            "children": [{
                "id": "id492@BARK",
                "name": "BARK",
                "members": [
                    "BARK1",
                    "BARK2"
                ],
                "path": "PK_AGC_GRK_BARK.png"
            },
            {
                "id": "id493@GRK",
                "name": "GRK",
                "members": [
                    "GPRK4",
                    "GPRK5",
                    "GPRK6",
                    "GPRK7",
                    "RHOK"
                ],
                "path": "PK_AGC_GRK_GRK.png"
            }
            ]
        },
        {
            "id": "id252@MAST",
            "name": "MAST",
            "protein": "",
            "path": "PK_AGC_MAST.png",
            "members": [
                "MAST1",
                "MAST2",
                "MAST3",
                "MAST4",
                "MASTL"
            ],
            "children": []
        },
        {
            "id": "id253@NDR",
            "name": "NDR",
            "protein": "",
            "path": "PK_AGC_NDR.png",
            "members": [
                "LATS1",
                "LATS2",
                "NDR1",
                "NDR2"
            ],
            "children": []
        },
        {
            "id": "id254@PDK1",
            "name": "PDK1",
            "protein": "",
            "path": "PK_AGC_PDK1.png",
            "members": [
                "PDK1"
            ],
            "children": []
        },
        {
            "id": "id255@PKA",
            "name": "PKA",
            "protein": "",
            "path": "PK_AGC_PKA.png",
            "members": [
                "PKACa",
                "PKACb",
                "PKACg",
                "PRKX",
                "PRKY"
            ],
            "children": []
        },
        {
            "id": "id256@PKC",
            "name": "PKC",
            "protein": "",
            "path": "PK_AGC_PKC.png",
            "members": [
                "PKCa",
                "PKCb",
                "PKCd",
                "PKCe",
                "PKCg",
                "PKCh",
                "PKCi",
                "PKCt",
                "PKCz"
            ],
            "children": [{
                "id": "id499@PKCa",
                "name": "PKCa",
                "members": [
                    "PKCa",
                    "PKCb",
                    "PKCg"
                ],
                "path": "PK_AGC_PKC_PKCa.png"
            },
            {
                "id": "id500@PKCd",
                "name": "PKCd",
                "members": [
                    "PKCd",
                    "PKCt"
                ],
                "path": "PK_AGC_PKC_PKCd.png"
            },
            {
                "id": "id501@PKCh",
                "name": "PKCh",
                "members": [
                    "PKCe",
                    "PKCh"
                ],
                "path": "PK_AGC_PKC_PKCh.png"
            },
            {
                "id": "id502@PKCi",
                "name": "PKCi",
                "members": [
                    "PKCi",
                    "PKCz"
                ],
                "path": "PK_AGC_PKC_PKCi.png"
            }
            ]
        },
        {
            "id": "id261@PKG",
            "name": "PKG",
            "protein": "",
            "path": "PK_AGC_PKG.png",
            "members": [
                "PKG1",
                "PKG2"
            ],
            "children": []
        },
        {
            "id": "id262@PKN",
            "name": "PKN",
            "protein": "",
            "path": "PK_AGC_PKN.png",
            "members": [
                "PKN1",
                "PKN2",
                "PKN3"
            ],
            "children": []
        },
        {
            "id": "id263@RSK",
            "name": "RSK",
            "protein": "",
            "path": "PK_AGC_RSK.png",
            "members": [
                "MSK1",
                "MSK2",
                "RSK1",
                "RSK2",
                "RSK3",
                "RSK4",
                "p70S6K",
                "p70S6Kb"
            ],
            "children": [{
                "id": "id506@MSK",
                "name": "MSK",
                "members": [
                    "MSK1",
                    "MSK2"
                ],
                "path": "PK_AGC_RSK_MSK.png"
            },
            {
                "id": "id507@RSKp70",
                "name": "RSKp70",
                "members": [
                    "p70S6K",
                    "p70S6Kb"
                ],
                "path": "PK_AGC_RSK_RSKp70.png"
            },
            {
                "id": "id508@RSKp90",
                "name": "RSKp90",
                "members": [
                    "RSK1",
                    "RSK2",
                    "RSK3",
                    "RSK4"
                ],
                "path": "PK_AGC_RSK_RSKp90.png"
            }
            ]
        },
        {
            "id": "id267@RSKL",
            "name": "RSKL",
            "protein": "",
            "path": "PK_AGC_RSKL.png",
            "members": [
                "RSKL1",
                "RSKL2"
            ],
            "children": []
        },
        {
            "id": "id268@RSKR",
            "name": "RSKR",
            "protein": "",
            "path": "PK_AGC_RSKR.png",
            "members": [
                "SgK494"
            ],
            "children": []
        },
        {
            "id": "id269@SGK",
            "name": "SGK",
            "protein": "",
            "path": "PK_AGC_SGK.png",
            "members": [
                "SGK1",
                "SGK2",
                "SGK3"
            ],
            "children": []
        },
        {
            "id": "id270@YANK",
            "name": "YANK",
            "protein": "",
            "path": "PK_AGC_YANK.png",
            "members": [
                "YANK1",
                "YANK2",
                "YANK3"
            ],
            "children": []
        }
        ]
    },
    {
        "id": "id29@CAMK",
        "name": "CAMK",
        "protein": "",
        "path": "PK_CAMK.png",
        "members": [
            "AMPKa1",
            "AMPKa2",
            "BRSK1",
            "BRSK2",
            "CASK",
            "CHK1",
            "CHK2",
            "CaMK1a",
            "CaMK1b",
            "CaMK1d",
            "CaMK1g",
            "CaMK2a",
            "CaMK2b",
            "CaMK2d",
            "CaMK2g",
            "CaMK4",
            "DAPK1",
            "DAPK2",
            "DAPK3",
            "DCAMKL1",
            "DCAMKL2",
            "DCAMKL3",
            "DRAK1",
            "DRAK2",
            "HUNK",
            "LKB1",
            "MAPKAPK2",
            "MAPKAPK3",
            "MAPKAPK5",
            "MARK1",
            "MARK2",
            "MARK3",
            "MARK4",
            "MELK",
            "MNK1",
            "MNK2",
            "MSK1_b",
            "MSK2_b",
            "NIM1",
            "NuaK1",
            "NuaK2",
            "Obscn",
            "Obscn_b",
            "PASK",
            "PHKg1",
            "PHKg2",
            "PIM1",
            "PIM2",
            "PIM3",
            "PKD1",
            "PKD2",
            "PKD3",
            "PSKH1",
            "PSKH2",
            "QIK",
            "QSK",
            "RSK1_b",
            "RSK2_b",
            "RSK3_b",
            "RSK4_b",
            "SIK",
            "SNRK",
            "SPEG",
            "SPEG_b",
            "SSTK",
            "STK33",
            "SgK085",
            "SgK495",
            "TSSK1",
            "TSSK2",
            "TSSK3",
            "TSSK4",
            "TTN",
            "Trad",
            "Trb1",
            "Trb2",
            "Trb3",
            "Trio",
            "VACAMKL",
            "caMLCK",
            "skMLCK",
            "smMLCK"
        ],
        "children": [{
            "id": "id272@CAMK1",
            "name": "CAMK1",
            "protein": "",
            "path": "PK_CAMK_CAMK1.png",
            "members": [
                "CaMK1a",
                "CaMK1b",
                "CaMK1d",
                "CaMK1g",
                "CaMK4"
            ],
            "children": []
        },
        {
            "id": "id273@CAMK2",
            "name": "CAMK2",
            "protein": "",
            "path": "PK_CAMK_CAMK2.png",
            "members": [
                "CaMK2a",
                "CaMK2b",
                "CaMK2d",
                "CaMK2g"
            ],
            "children": []
        },
        {
            "id": "id274@CAMKL",
            "name": "CAMKL",
            "protein": "",
            "path": "PK_CAMK_CAMKL.png",
            "members": [
                "AMPKa1",
                "AMPKa2",
                "BRSK1",
                "BRSK2",
                "CHK1",
                "HUNK",
                "LKB1",
                "MARK1",
                "MARK2",
                "MARK3",
                "MARK4",
                "MELK",
                "NIM1",
                "NuaK1",
                "NuaK2",
                "PASK",
                "QIK",
                "QSK",
                "SIK",
                "SNRK"
            ],
            "children": [{
                "id": "id517@AMPK",
                "name": "AMPK",
                "members": [
                    "AMPKa1",
                    "AMPKa2"
                ],
                "path": "PK_CAMK_CAMKL_AMPK.png"
            },
            {
                "id": "id518@BRSK",
                "name": "BRSK",
                "members": [
                    "BRSK1",
                    "BRSK2"
                ],
                "path": "PK_CAMK_CAMKL_BRSK.png"
            },
            {
                "id": "id519@CHK1",
                "name": "CHK1",
                "members": [
                    "CHK1"
                ],
                "path": "PK_CAMK_CAMKL_CHK1.png"
            },
            {
                "id": "id520@HUNK",
                "name": "HUNK",
                "members": [
                    "HUNK"
                ],
                "path": "PK_CAMK_CAMKL_HUNK.png"
            },
            {
                "id": "id521@LKB",
                "name": "LKB",
                "members": [
                    "LKB1"
                ],
                "path": "PK_CAMK_CAMKL_LKB.png"
            },
            {
                "id": "id522@MARK",
                "name": "MARK",
                "members": [
                    "MARK1",
                    "MARK2",
                    "MARK3",
                    "MARK4"
                ],
                "path": "PK_CAMK_CAMKL_MARK.png"
            },
            {
                "id": "id523@MELK",
                "name": "MELK",
                "members": [
                    "MELK"
                ],
                "path": "PK_CAMK_CAMKL_MELK.png"
            },
            {
                "id": "id524@NIM1",
                "name": "NIM1",
                "members": [
                    "NIM1"
                ],
                "path": "PK_CAMK_CAMKL_NIM1.png"
            },
            {
                "id": "id525@NuaK",
                "name": "NuaK",
                "members": [
                    "NuaK1",
                    "NuaK2"
                ],
                "path": "PK_CAMK_CAMKL_NuaK.png"
            },
            {
                "id": "id526@PASK",
                "name": "PASK",
                "members": [
                    "PASK"
                ],
                "path": "PK_CAMK_CAMKL_PASK.png"
            },
            {
                "id": "id527@QIK",
                "name": "QIK",
                "members": [
                    "QIK",
                    "QSK",
                    "SIK"
                ],
                "path": "PK_CAMK_CAMKL_QIK.png"
            },
            {
                "id": "id528@SNRK",
                "name": "SNRK",
                "members": [
                    "SNRK"
                ],
                "path": "PK_CAMK_CAMKL_SNRK.png"
            }
            ]
        },
        {
            "id": "id287@CASK",
            "name": "CASK",
            "protein": "",
            "path": "PK_CAMK_CASK.png",
            "members": [
                "CASK"
            ],
            "children": []
        },
        {
            "id": "id288@DAPK",
            "name": "DAPK",
            "protein": "",
            "path": "PK_CAMK_DAPK.png",
            "members": [
                "DAPK1",
                "DAPK2",
                "DAPK3",
                "DRAK1",
                "DRAK2"
            ],
            "children": []
        },
        {
            "id": "id289@DCAMKL",
            "name": "DCAMKL",
            "protein": "",
            "path": "PK_CAMK_DCAMKL.png",
            "members": [
                "DCAMKL1",
                "DCAMKL2",
                "DCAMKL3"
            ],
            "children": []
        },
        {
            "id": "id290@MAPKAPK",
            "name": "MAPKAPK",
            "protein": "",
            "path": "PK_CAMK_MAPKAPK.png",
            "members": [
                "MAPKAPK2",
                "MAPKAPK3",
                "MAPKAPK5",
                "MNK1",
                "MNK2"
            ],
            "children": [{
                "id": "id533@MK2",
                "name": "MK2",
                "members": [
                    "MAPKAPK2",
                    "MAPKAPK3"
                ],
                "path": "PK_CAMK_MAPKAPK_MK2.png"
            },
            {
                "id": "id534@MK5",
                "name": "MK5",
                "members": [
                    "MAPKAPK5"
                ],
                "path": "PK_CAMK_MAPKAPK_MK5.png"
            },
            {
                "id": "id535@MNK",
                "name": "MNK",
                "members": [
                    "MNK1",
                    "MNK2"
                ],
                "path": "PK_CAMK_MAPKAPK_MNK.png"
            }
            ]
        },
        {
            "id": "id294@MLCK",
            "name": "MLCK",
            "protein": "",
            "path": "PK_CAMK_MLCK.png",
            "members": [
                "SgK085",
                "TTN",
                "caMLCK",
                "skMLCK",
                "smMLCK"
            ],
            "children": []
        },
        {
            "id": "id295@PHK",
            "name": "PHK",
            "protein": "",
            "path": "PK_CAMK_PHK.png",
            "members": [
                "PHKg1",
                "PHKg2"
            ],
            "children": []
        },
        {
            "id": "id296@PIM",
            "name": "PIM",
            "protein": "",
            "path": "PK_CAMK_PIM.png",
            "members": [
                "PIM1",
                "PIM2",
                "PIM3"
            ],
            "children": []
        },
        {
            "id": "id297@PKD",
            "name": "PKD",
            "protein": "",
            "path": "PK_CAMK_PKD.png",
            "members": [
                "PKD1",
                "PKD2",
                "PKD3"
            ],
            "children": []
        },
        {
            "id": "id298@PSK",
            "name": "PSK",
            "protein": "",
            "path": "PK_CAMK_PSK.png",
            "members": [
                "PSKH1",
                "PSKH2"
            ],
            "children": []
        },
        {
            "id": "id299@RAD53",
            "name": "RAD53",
            "protein": "",
            "path": "PK_CAMK_RAD53.png",
            "members": [
                "CHK2"
            ],
            "children": []
        },
        {
            "id": "id300@RSKb",
            "name": "RSKb",
            "protein": "",
            "path": "PK_CAMK_RSKb.png",
            "members": [
                "MSK1_b",
                "MSK2_b",
                "RSK1_b",
                "RSK2_b",
                "RSK3_b",
                "RSK4_b"
            ],
            "children": [{
                "id": "id543@MSKb",
                "name": "MSKb",
                "members": [
                    "MSK1_b",
                    "MSK2_b"
                ],
                "path": "PK_CAMK_RSKb_MSKb.png"
            },
            {
                "id": "id544@RSKb",
                "name": "RSKb",
                "members": [
                    "RSK1_b",
                    "RSK2_b",
                    "RSK3_b",
                    "RSK4_b"
                ],
                "path": "PK_CAMK_RSKb_RSKb.png"
            }
            ]
        },
        {
            "id": "id303@SgK495",
            "name": "SgK495",
            "protein": "",
            "path": "PK_CAMK_SgK495.png",
            "members": [
                "SgK495"
            ],
            "children": []
        },
        {
            "id": "id304@STK33",
            "name": "STK33",
            "protein": "",
            "path": "PK_CAMK_STK33.png",
            "members": [
                "STK33"
            ],
            "children": []
        },
        {
            "id": "id305@Trbl",
            "name": "Trbl",
            "protein": "",
            "path": "PK_CAMK_Trbl.png",
            "members": [
                "Trb1",
                "Trb2",
                "Trb3"
            ],
            "children": []
        },
        {
            "id": "id306@Trio",
            "name": "Trio",
            "protein": "",
            "path": "PK_CAMK_Trio.png",
            "members": [
                "Obscn",
                "Obscn_b",
                "SPEG",
                "SPEG_b",
                "Trad",
                "Trio"
            ],
            "children": []
        },
        {
            "id": "id307@TSSK",
            "name": "TSSK",
            "protein": "",
            "path": "PK_CAMK_TSSK.png",
            "members": [
                "SSTK",
                "TSSK1",
                "TSSK2",
                "TSSK3",
                "TSSK4"
            ],
            "children": []
        },
        {
            "id": "id308@CAMK-Unique",
            "name": "CAMK-Unique",
            "protein": "",
            "path": "PK_CAMK_CAMK-Unique.png",
            "members": [
                "VACAMKL"
            ],
            "children": []
        }
        ]
    },
    {
        "id": "id67@CK1",
        "name": "CK1",
        "protein": "",
        "path": "PK_CK1.png",
        "members": [
            "CK1a",
            "CK1a2",
            "CK1d",
            "CK1e",
            "CK1g1",
            "CK1g2",
            "CK1g3",
            "TTBK1",
            "TTBK2",
            "VRK1",
            "VRK2",
            "VRK3"
        ],
        "children": [{
            "id": "id310@CK1",
            "name": "CK1",
            "protein": "",
            "path": "PK_CK1_CK1.png",
            "members": [
                "CK1a",
                "CK1a2",
                "CK1d",
                "CK1e",
                "CK1g1",
                "CK1g2",
                "CK1g3"
            ],
            "children": []
        },
        {
            "id": "id311@TTBK",
            "name": "TTBK",
            "protein": "",
            "path": "PK_CK1_TTBK.png",
            "members": [
                "TTBK1",
                "TTBK2"
            ],
            "children": []
        },
        {
            "id": "id312@VRK",
            "name": "VRK",
            "protein": "",
            "path": "PK_CK1_VRK.png",
            "members": [
                "VRK1",
                "VRK2",
                "VRK3"
            ],
            "children": []
        }
        ]
    },
    {
        "id": "id71@CMGC",
        "name": "CMGC",
        "protein": "",
        "path": "PK_CMGC.png",
        "members": [
            "CCRK",
            "CDC2",
            "CDK10",
            "CDK11",
            "CDK2",
            "CDK3",
            "CDK4",
            "CDK5",
            "CDK6",
            "CDK7",
            "CDK8",
            "CDK9",
            "CDKL1",
            "CDKL2",
            "CDKL3",
            "CDKL4",
            "CDKL5",
            "CHED",
            "CK2a1",
            "CK2a2",
            "CLK1",
            "CLK2",
            "CLK3",
            "CLK4",
            "CRK7",
            "DYRK1A",
            "DYRK1B",
            "DYRK2",
            "DYRK3",
            "DYRK4",
            "Erk1",
            "Erk2",
            "Erk3",
            "Erk4",
            "Erk5",
            "Erk7",
            "GSK3A",
            "GSK3B",
            "HIPK1",
            "HIPK2",
            "HIPK3",
            "HIPK4",
            "ICK",
            "JNK1",
            "JNK2",
            "JNK3",
            "MAK",
            "MOK",
            "MSSK1",
            "NLK",
            "PCTAIRE1",
            "PCTAIRE2",
            "PCTAIRE3",
            "PFTAIRE1",
            "PFTAIRE2",
            "PITSLRE",
            "PRP4",
            "SRPK1",
            "SRPK2",
            "p38a",
            "p38b",
            "p38d",
            "p38g"
        ],
        "children": [{
            "id": "id314@CDK",
            "name": "CDK",
            "protein": "",
            "path": "PK_CMGC_CDK.png",
            "members": [
                "CCRK",
                "CDC2",
                "CDK10",
                "CDK11",
                "CDK2",
                "CDK3",
                "CDK4",
                "CDK5",
                "CDK6",
                "CDK7",
                "CDK8",
                "CDK9",
                "CHED",
                "CRK7",
                "PCTAIRE1",
                "PCTAIRE2",
                "PCTAIRE3",
                "PFTAIRE1",
                "PFTAIRE2",
                "PITSLRE"
            ],
            "children": [{
                "id": "id557@CDC2",
                "name": "CDC2",
                "members": [
                    "CDC2"
                ],
                "path": "PK_CMGC_CDK_CDC2.png"
            },
            {
                "id": "id558@CDK2",
                "name": "CDK2",
                "members": [
                    "CDK2",
                    "CDK3"
                ],
                "path": "PK_CMGC_CDK_CDK2.png"
            },
            {
                "id": "id559@CDK4",
                "name": "CDK4",
                "members": [
                    "CDK4",
                    "CDK6"
                ],
                "path": "PK_CMGC_CDK_CDK4.png"
            },
            {
                "id": "id560@CDK5",
                "name": "CDK5",
                "members": [
                    "CDK5"
                ],
                "path": "PK_CMGC_CDK_CDK5.png"
            },
            {
                "id": "id561@CDK7",
                "name": "CDK7",
                "members": [
                    "CDK7"
                ],
                "path": "PK_CMGC_CDK_CDK7.png"
            },
            {
                "id": "id562@CDK8",
                "name": "CDK8",
                "members": [
                    "CDK11",
                    "CDK8"
                ],
                "path": "PK_CMGC_CDK_CDK8.png"
            },
            {
                "id": "id563@CDK9",
                "name": "CDK9",
                "members": [
                    "CDK9"
                ],
                "path": "PK_CMGC_CDK_CDK9.png"
            },
            {
                "id": "id564@CDK10",
                "name": "CDK10",
                "members": [
                    "CDK10"
                ],
                "path": "PK_CMGC_CDK_CDK10.png"
            },
            {
                "id": "id565@CDK11",
                "name": "CDK11",
                "members": [
                    "PITSLRE"
                ],
                "path": "PK_CMGC_CDK_CDK11.png"
            },
            {
                "id": "id566@CRK7",
                "name": "CRK7",
                "members": [
                    "CHED",
                    "CRK7"
                ],
                "path": "PK_CMGC_CDK_CRK7.png"
            },
            {
                "id": "id567@PCTAIRE",
                "name": "PCTAIRE",
                "members": [
                    "PCTAIRE1",
                    "PCTAIRE2",
                    "PCTAIRE3"
                ],
                "path": "PK_CMGC_CDK_PCTAIRE.png"
            },
            {
                "id": "id568@PFTAIRE",
                "name": "PFTAIRE",
                "members": [
                    "PFTAIRE1",
                    "PFTAIRE2"
                ],
                "path": "PK_CMGC_CDK_PFTAIRE.png"
            }
            ]
        },
        {
            "id": "id327@CDKL",
            "name": "CDKL",
            "protein": "",
            "path": "PK_CMGC_CDKL.png",
            "members": [
                "CDKL1",
                "CDKL2",
                "CDKL3",
                "CDKL4",
                "CDKL5"
            ],
            "children": []
        },
        {
            "id": "id328@CK2",
            "name": "CK2",
            "protein": "",
            "path": "PK_CMGC_CK2.png",
            "members": [
                "CK2a1",
                "CK2a2"
            ],
            "children": []
        },
        {
            "id": "id329@CLK",
            "name": "CLK",
            "protein": "",
            "path": "PK_CMGC_CLK.png",
            "members": [
                "CLK1",
                "CLK2",
                "CLK3",
                "CLK4"
            ],
            "children": []
        },
        {
            "id": "id330@DYRK",
            "name": "DYRK",
            "protein": "",
            "path": "PK_CMGC_DYRK.png",
            "members": [
                "DYRK1A",
                "DYRK1B",
                "DYRK2",
                "DYRK3",
                "DYRK4",
                "HIPK1",
                "HIPK2",
                "HIPK3",
                "HIPK4",
                "PRP4"
            ],
            "children": [{
                "id": "id573@DYRK1",
                "name": "DYRK1",
                "members": [
                    "DYRK1A",
                    "DYRK1B"
                ],
                "path": "PK_CMGC_DYRK_DYRK1.png"
            },
            {
                "id": "id574@DYRK2",
                "name": "DYRK2",
                "members": [
                    "DYRK2",
                    "DYRK3",
                    "DYRK4"
                ],
                "path": "PK_CMGC_DYRK_DYRK2.png"
            },
            {
                "id": "id575@HIPK",
                "name": "HIPK",
                "members": [
                    "HIPK1",
                    "HIPK2",
                    "HIPK3",
                    "HIPK4"
                ],
                "path": "PK_CMGC_DYRK_HIPK.png"
            },
            {
                "id": "id576@PRP4",
                "name": "PRP4",
                "members": [
                    "PRP4"
                ],
                "path": "PK_CMGC_DYRK_PRP4.png"
            }
            ]
        },
        {
            "id": "id335@GSK",
            "name": "GSK",
            "protein": "",
            "path": "PK_CMGC_GSK.png",
            "members": [
                "GSK3A",
                "GSK3B"
            ],
            "children": []
        },
        {
            "id": "id336@MAPK",
            "name": "MAPK",
            "protein": "",
            "path": "PK_CMGC_MAPK.png",
            "members": [
                "Erk1",
                "Erk2",
                "Erk3",
                "Erk4",
                "Erk5",
                "Erk7",
                "JNK1",
                "JNK2",
                "JNK3",
                "NLK",
                "p38a",
                "p38b",
                "p38d",
                "p38g"
            ],
            "children": [{
                "id": "id579@ERK1",
                "name": "ERK1",
                "members": [
                    "Erk1",
                    "Erk2"
                ],
                "path": "PK_CMGC_MAPK_ERK1.png"
            },
            {
                "id": "id580@ERK3",
                "name": "ERK3",
                "members": [
                    "Erk3",
                    "Erk4"
                ],
                "path": "PK_CMGC_MAPK_ERK3.png"
            },
            {
                "id": "id581@ERK5",
                "name": "ERK5",
                "members": [
                    "Erk5"
                ],
                "path": "PK_CMGC_MAPK_ERK5.png"
            },
            {
                "id": "id582@ERK7",
                "name": "ERK7",
                "members": [
                    "Erk7"
                ],
                "path": "PK_CMGC_MAPK_ERK7.png"
            },
            {
                "id": "id583@JNK",
                "name": "JNK",
                "members": [
                    "JNK1",
                    "JNK2",
                    "JNK3"
                ],
                "path": "PK_CMGC_MAPK_JNK.png"
            },
            {
                "id": "id584@nmo",
                "name": "nmo",
                "members": [
                    "NLK"
                ],
                "path": "PK_CMGC_MAPK_nmo.png"
            },
            {
                "id": "id585@p38",
                "name": "p38",
                "members": [
                    "p38a",
                    "p38b",
                    "p38d",
                    "p38g"
                ],
                "path": "PK_CMGC_MAPK_p38.png"
            }
            ]
        },
        {
            "id": "id344@RCK",
            "name": "RCK",
            "protein": "",
            "path": "PK_CMGC_RCK.png",
            "members": [
                "ICK",
                "MAK",
                "MOK"
            ],
            "children": []
        },
        {
            "id": "id345@SRPK",
            "name": "SRPK",
            "protein": "",
            "path": "PK_CMGC_SRPK.png",
            "members": [
                "MSSK1",
                "SRPK1",
                "SRPK2"
            ],
            "children": []
        }
        ]
    },
    {
        "id": "id104@RGC",
        "name": "RGC",
        "protein": "",
        "path": "PK_RGC.png",
        "members": [
            "ANPa",
            "ANPb",
            "CYGD",
            "CYGF",
            "HSER"
        ],
        "children": [{
            "id": "id347@RGC",
            "name": "RGC",
            "protein": "",
            "path": "PK_RGC_RGC.png",
            "members": [
                "ANPa",
                "ANPb",
                "CYGD",
                "CYGF",
                "HSER"
            ],
            "children": []
        }]
    },
    {
        "id": "id106@STE",
        "name": "STE",
        "protein": "",
        "path": "PK_STE.png",
        "members": [
            "COT",
            "GCK",
            "GCN2_b",
            "HGK",
            "HPK1",
            "KHS1",
            "KHS2",
            "LOK",
            "MAP2K1",
            "MAP2K2",
            "MAP2K3",
            "MAP2K4",
            "MAP2K5",
            "MAP2K6",
            "MAP2K7",
            "MAP3K1",
            "MAP3K19",
            "MAP3K2",
            "MAP3K3",
            "MAP3K4",
            "MAP3K5",
            "MAP3K6",
            "MAP3K7",
            "MINK",
            "MST1",
            "MST2",
            "MST3",
            "MST4",
            "MYO3A",
            "MYO3B",
            "NIK",
            "NRK",
            "OSR1",
            "PAK1",
            "PAK2",
            "PAK3",
            "PAK4",
            "PAK5",
            "PAK6",
            "SLK",
            "STLK3",
            "STLK5",
            "STLK6",
            "TAO1",
            "TAO2",
            "TAO3",
            "TNIK",
            "YSK1"
        ],
        "children": [{
            "id": "id349@STE7",
            "name": "STE7",
            "protein": "",
            "path": "PK_STE_STE7.png",
            "members": [
                "MAP2K1",
                "MAP2K2",
                "MAP2K3",
                "MAP2K4",
                "MAP2K5",
                "MAP2K6",
                "MAP2K7"
            ],
            "children": []
        },
        {
            "id": "id350@STE11",
            "name": "STE11",
            "protein": "",
            "path": "PK_STE_STE11.png",
            "members": [
                "MAP3K1",
                "MAP3K19",
                "MAP3K2",
                "MAP3K3",
                "MAP3K4",
                "MAP3K5",
                "MAP3K6",
                "MAP3K7"
            ],
            "children": []
        },
        {
            "id": "id351@STE20",
            "name": "STE20",
            "protein": "",
            "path": "PK_STE_STE20.png",
            "members": [
                "GCK",
                "HGK",
                "HPK1",
                "KHS1",
                "KHS2",
                "LOK",
                "MINK",
                "MST1",
                "MST2",
                "MST3",
                "MST4",
                "MYO3A",
                "MYO3B",
                "NRK",
                "OSR1",
                "PAK1",
                "PAK2",
                "PAK3",
                "PAK4",
                "PAK5",
                "PAK6",
                "SLK",
                "STLK3",
                "STLK5",
                "STLK6",
                "TAO1",
                "TAO2",
                "TAO3",
                "TNIK",
                "YSK1"
            ],
            "children": [{
                "id": "id594@FRAY",
                "name": "FRAY",
                "members": [
                    "OSR1",
                    "STLK3"
                ],
                "path": "PK_STE_STE20_FRAY.png"
            },
            {
                "id": "id595@KHS",
                "name": "KHS",
                "members": [
                    "GCK",
                    "HPK1",
                    "KHS1",
                    "KHS2"
                ],
                "path": "PK_STE_STE20_KHS.png"
            },
            {
                "id": "id596@MSN",
                "name": "MSN",
                "members": [
                    "HGK",
                    "MINK",
                    "NRK",
                    "TNIK"
                ],
                "path": "PK_STE_STE20_MSN.png"
            },
            {
                "id": "id597@MST",
                "name": "MST",
                "members": [
                    "MST1",
                    "MST2"
                ],
                "path": "PK_STE_STE20_MST.png"
            },
            {
                "id": "id598@NinaC",
                "name": "NinaC",
                "members": [
                    "MYO3A",
                    "MYO3B"
                ],
                "path": "PK_STE_STE20_NinaC.png"
            },
            {
                "id": "id599@PAKA",
                "name": "PAKA",
                "members": [
                    "PAK1",
                    "PAK2",
                    "PAK3"
                ],
                "path": "PK_STE_STE20_PAKA.png"
            },
            {
                "id": "id600@PAKB",
                "name": "PAKB",
                "members": [
                    "PAK4",
                    "PAK5",
                    "PAK6"
                ],
                "path": "PK_STE_STE20_PAKB.png"
            },
            {
                "id": "id601@SLK",
                "name": "SLK",
                "members": [
                    "LOK",
                    "SLK"
                ],
                "path": "PK_STE_STE20_SLK.png"
            },
            {
                "id": "id602@STLK",
                "name": "STLK",
                "members": [
                    "STLK5",
                    "STLK6"
                ],
                "path": "PK_STE_STE20_STLK.png"
            },
            {
                "id": "id603@TAO",
                "name": "TAO",
                "members": [
                    "TAO1",
                    "TAO2",
                    "TAO3"
                ],
                "path": "PK_STE_STE20_TAO.png"
            },
            {
                "id": "id604@YSK",
                "name": "YSK",
                "members": [
                    "MST3",
                    "MST4",
                    "YSK1"
                ],
                "path": "PK_STE_STE20_YSK.png"
            }
            ]
        },
        {
            "id": "id363@STE-Unique",
            "name": "STE-Unique",
            "protein": "",
            "path": "PK_STE_STE-Unique.png",
            "members": [
                "COT",
                "GCN2_b",
                "NIK"
            ],
            "children": []
        }
        ]
    },
    {
        "id": "id122@TK",
        "name": "TK",
        "protein": "",
        "path": "PK_TK.png",
        "members": [
            "ABL1",
            "ABL2",
            "ACK",
            "ALK",
            "AXL",
            "BLK",
            "BMX",
            "BRK",
            "BTK",
            "CCK4",
            "CSK",
            "CTK",
            "DDR1",
            "DDR2",
            "EGFR",
            "EphA1",
            "EphA10",
            "EphA2",
            "EphA3",
            "EphA4",
            "EphA5",
            "EphA6",
            "EphA7",
            "EphA8",
            "EphB1",
            "EphB2",
            "EphB3",
            "EphB4",
            "EphB6",
            "ErbB2",
            "ErbB3",
            "ErbB4",
            "FAK",
            "FER",
            "FES",
            "FGFR1",
            "FGFR2",
            "FGFR3",
            "FGFR4",
            "FGR",
            "FLT1",
            "FLT3",
            "FLT4",
            "FMS",
            "FRK",
            "FYN",
            "HCK",
            "IGF1R",
            "INSR",
            "IRR",
            "ITK",
            "JAK1",
            "JAK1_b",
            "JAK2",
            "JAK2_b",
            "JAK3",
            "JAK3_b",
            "KDR",
            "KIT",
            "LCK",
            "LMR1",
            "LMR2",
            "LMR3",
            "LTK",
            "LYN",
            "MER",
            "MET",
            "MUSK",
            "PDGFRa",
            "PDGFRb",
            "PYK2",
            "RET",
            "RON",
            "ROR1",
            "ROR2",
            "ROS",
            "RYK",
            "SRC",
            "SRM",
            "SYK",
            "SuRTK106",
            "TEC",
            "TIE1",
            "TIE2",
            "TNK1",
            "TRKA",
            "TRKB",
            "TRKC",
            "TXK",
            "TYK2",
            "TYK2_b",
            "TYRO3",
            "YES",
            "ZAP70"
        ],
        "children": [{
            "id": "id365@Abl",
            "name": "Abl",
            "protein": "",
            "path": "PK_TK_Abl.png",
            "members": [
                "ABL1",
                "ABL2"
            ],
            "children": []
        },
        {
            "id": "id366@Ack",
            "name": "Ack",
            "protein": "",
            "path": "PK_TK_Ack.png",
            "members": [
                "ACK",
                "TNK1"
            ],
            "children": []
        },
        {
            "id": "id367@ALK",
            "name": "ALK",
            "protein": "",
            "path": "PK_TK_ALK.png",
            "members": [
                "ALK",
                "LTK"
            ],
            "children": []
        },
        {
            "id": "id368@Axl",
            "name": "Axl",
            "protein": "",
            "path": "PK_TK_Axl.png",
            "members": [
                "AXL",
                "MER",
                "TYRO3"
            ],
            "children": []
        },
        {
            "id": "id369@CCK4",
            "name": "CCK4",
            "protein": "",
            "path": "PK_TK_CCK4.png",
            "members": [
                "CCK4"
            ],
            "children": []
        },
        {
            "id": "id370@Csk",
            "name": "Csk",
            "protein": "",
            "path": "PK_TK_Csk.png",
            "members": [
                "CSK",
                "CTK"
            ],
            "children": []
        },
        {
            "id": "id371@DDR",
            "name": "DDR",
            "protein": "",
            "path": "PK_TK_DDR.png",
            "members": [
                "DDR1",
                "DDR2"
            ],
            "children": []
        },
        {
            "id": "id372@EGFR",
            "name": "EGFR",
            "protein": "",
            "path": "PK_TK_EGFR.png",
            "members": [
                "EGFR",
                "ErbB2",
                "ErbB3",
                "ErbB4"
            ],
            "children": []
        },
        {
            "id": "id373@Eph",
            "name": "Eph",
            "protein": "",
            "path": "PK_TK_Eph.png",
            "members": [
                "EphA1",
                "EphA10",
                "EphA2",
                "EphA3",
                "EphA4",
                "EphA5",
                "EphA6",
                "EphA7",
                "EphA8",
                "EphB1",
                "EphB2",
                "EphB3",
                "EphB4",
                "EphB6"
            ],
            "children": []
        },
        {
            "id": "id374@FAK",
            "name": "FAK",
            "protein": "",
            "path": "PK_TK_FAK.png",
            "members": [
                "FAK",
                "PYK2"
            ],
            "children": []
        },
        {
            "id": "id375@Fer",
            "name": "Fer",
            "protein": "",
            "path": "PK_TK_Fer.png",
            "members": [
                "FER",
                "FES"
            ],
            "children": []
        },
        {
            "id": "id376@FGFR",
            "name": "FGFR",
            "protein": "",
            "path": "PK_TK_FGFR.png",
            "members": [
                "FGFR1",
                "FGFR2",
                "FGFR3",
                "FGFR4"
            ],
            "children": []
        },
        {
            "id": "id377@InsR",
            "name": "InsR",
            "protein": "",
            "path": "PK_TK_InsR.png",
            "members": [
                "IGF1R",
                "INSR",
                "IRR"
            ],
            "children": []
        },
        {
            "id": "id378@Jak",
            "name": "Jak",
            "protein": "",
            "path": "PK_TK_Jak.png",
            "members": [
                "JAK1",
                "JAK2",
                "JAK3",
                "TYK2"
            ],
            "children": []
        },
        {
            "id": "id379@JakB",
            "name": "JakB",
            "protein": "",
            "path": "PK_TK_JakB.png",
            "members": [
                "JAK1_b",
                "JAK2_b",
                "JAK3_b",
                "TYK2_b"
            ],
            "children": []
        },
        {
            "id": "id380@Lmr",
            "name": "Lmr",
            "protein": "",
            "path": "PK_TK_Lmr.png",
            "members": [
                "LMR1",
                "LMR2",
                "LMR3"
            ],
            "children": []
        },
        {
            "id": "id381@Met",
            "name": "Met",
            "protein": "",
            "path": "PK_TK_Met.png",
            "members": [
                "MET",
                "RON"
            ],
            "children": []
        },
        {
            "id": "id382@Musk",
            "name": "Musk",
            "protein": "",
            "path": "PK_TK_Musk.png",
            "members": [
                "MUSK"
            ],
            "children": []
        },
        {
            "id": "id383@PDGFR",
            "name": "PDGFR",
            "protein": "",
            "path": "PK_TK_PDGFR.png",
            "members": [
                "FLT3",
                "FMS",
                "KIT",
                "PDGFRa",
                "PDGFRb"
            ],
            "children": []
        },
        {
            "id": "id384@Ret",
            "name": "Ret",
            "protein": "",
            "path": "PK_TK_Ret.png",
            "members": [
                "RET"
            ],
            "children": []
        },
        {
            "id": "id385@Ror",
            "name": "Ror",
            "protein": "",
            "path": "PK_TK_Ror.png",
            "members": [
                "ROR1",
                "ROR2"
            ],
            "children": []
        },
        {
            "id": "id386@Ryk",
            "name": "Ryk",
            "protein": "",
            "path": "PK_TK_Ryk.png",
            "members": [
                "RYK"
            ],
            "children": []
        },
        {
            "id": "id387@Sev",
            "name": "Sev",
            "protein": "",
            "path": "PK_TK_Sev.png",
            "members": [
                "ROS"
            ],
            "children": []
        },
        {
            "id": "id388@Src",
            "name": "Src",
            "protein": "",
            "path": "PK_TK_Src.png",
            "members": [
                "BLK",
                "BRK",
                "FGR",
                "FRK",
                "FYN",
                "HCK",
                "LCK",
                "LYN",
                "SRC",
                "SRM",
                "YES"
            ],
            "children": []
        },
        {
            "id": "id389@Syk",
            "name": "Syk",
            "protein": "",
            "path": "PK_TK_Syk.png",
            "members": [
                "SYK",
                "ZAP70"
            ],
            "children": []
        },
        {
            "id": "id390@Tec",
            "name": "Tec",
            "protein": "",
            "path": "PK_TK_Tec.png",
            "members": [
                "BMX",
                "BTK",
                "ITK",
                "TEC",
                "TXK"
            ],
            "children": []
        },
        {
            "id": "id391@Tie",
            "name": "Tie",
            "protein": "",
            "path": "PK_TK_Tie.png",
            "members": [
                "TIE1",
                "TIE2"
            ],
            "children": []
        },
        {
            "id": "id392@Trk",
            "name": "Trk",
            "protein": "",
            "path": "PK_TK_Trk.png",
            "members": [
                "TRKA",
                "TRKB",
                "TRKC"
            ],
            "children": []
        },
        {
            "id": "id393@VEGFR",
            "name": "VEGFR",
            "protein": "",
            "path": "PK_TK_VEGFR.png",
            "members": [
                "FLT1",
                "FLT4",
                "KDR"
            ],
            "children": []
        },
        {
            "id": "id394@TK-Unique",
            "name": "TK-Unique",
            "protein": "",
            "path": "PK_TK_TK-Unique.png",
            "members": [
                "SuRTK106"
            ],
            "children": []
        }
        ]
    },
    {
        "id": "id153@TKL",
        "name": "TKL",
        "protein": "",
        "path": "PK_TKL.png",
        "members": [
            "ACTR2",
            "ACTR2B",
            "ALK1",
            "ALK2",
            "ALK4",
            "ALK7",
            "ANKRD3",
            "ARAF",
            "BMPR1A",
            "BMPR1B",
            "BMPR2",
            "BRAF",
            "DLK",
            "HH498",
            "ILK",
            "IRAK1",
            "IRAK2",
            "IRAK3",
            "IRAK4",
            "KSR1",
            "KSR2",
            "LIMK1",
            "LIMK2",
            "LRRK1",
            "LRRK2",
            "LZK",
            "MISR2",
            "MLK1",
            "MLK2",
            "MLK3",
            "MLK4",
            "MLKL",
            "RAF1",
            "RIPK1",
            "RIPK2",
            "RIPK3",
            "SgK288",
            "TAK1",
            "TESK1",
            "TESK2",
            "TGFbR1",
            "TGFbR2",
            "ZAK"
        ],
        "children": [{
            "id": "id396@IRAK",
            "name": "IRAK",
            "protein": "",
            "path": "PK_TKL_IRAK.png",
            "members": [
                "IRAK1",
                "IRAK2",
                "IRAK3",
                "IRAK4"
            ],
            "children": []
        },
        {
            "id": "id397@LISK",
            "name": "LISK",
            "protein": "",
            "path": "PK_TKL_LISK.png",
            "members": [
                "LIMK1",
                "LIMK2",
                "TESK1",
                "TESK2"
            ],
            "children": [{
                "id": "id640@LIMK",
                "name": "LIMK",
                "members": [
                    "LIMK1",
                    "LIMK2"
                ],
                "path": "PK_TKL_LISK_LIMK.png"
            },
            {
                "id": "id641@TESK",
                "name": "TESK",
                "members": [
                    "TESK1",
                    "TESK2"
                ],
                "path": "PK_TKL_LISK_TESK.png"
            }
            ]
        },
        {
            "id": "id400@LRRK",
            "name": "LRRK",
            "protein": "",
            "path": "PK_TKL_LRRK.png",
            "members": [
                "LRRK1",
                "LRRK2"
            ],
            "children": []
        },
        {
            "id": "id401@MLK",
            "name": "MLK",
            "protein": "",
            "path": "PK_TKL_MLK.png",
            "members": [
                "DLK",
                "HH498",
                "ILK",
                "LZK",
                "MLK1",
                "MLK2",
                "MLK3",
                "MLK4",
                "TAK1",
                "ZAK"
            ],
            "children": [{
                "id": "id644@HH498",
                "name": "HH498",
                "members": [
                    "HH498"
                ],
                "path": "PK_TKL_MLK_HH498.png"
            },
            {
                "id": "id645@ILK",
                "name": "ILK",
                "members": [
                    "ILK"
                ],
                "path": "PK_TKL_MLK_ILK.png"
            },
            {
                "id": "id646@LZK",
                "name": "LZK",
                "members": [
                    "DLK",
                    "LZK"
                ],
                "path": "PK_TKL_MLK_LZK.png"
            },
            {
                "id": "id647@MLK",
                "name": "MLK",
                "members": [
                    "MLK1",
                    "MLK2",
                    "MLK3",
                    "MLK4"
                ],
                "path": "PK_TKL_MLK_MLK.png"
            },
            {
                "id": "id648@TAK1",
                "name": "TAK1",
                "members": [
                    "TAK1"
                ],
                "path": "PK_TKL_MLK_TAK1.png"
            },
            {
                "id": "id649@ZAK",
                "name": "ZAK",
                "members": [
                    "ZAK"
                ],
                "path": "PK_TKL_MLK_ZAK.png"
            }
            ]
        },
        {
            "id": "id408@RAF",
            "name": "RAF",
            "protein": "",
            "path": "PK_TKL_RAF.png",
            "members": [
                "ARAF",
                "BRAF",
                "KSR1",
                "KSR2",
                "RAF1"
            ],
            "children": [{
                "id": "id651@KSR",
                "name": "KSR",
                "members": [
                    "KSR1"
                ],
                "path": "PK_TKL_RAF_KSR.png"
            }]
        },
        {
            "id": "id410@RIPK",
            "name": "RIPK",
            "protein": "",
            "path": "PK_TKL_RIPK.png",
            "members": [
                "ANKRD3",
                "RIPK1",
                "RIPK2",
                "RIPK3",
                "SgK288"
            ],
            "children": []
        },
        {
            "id": "id411@STKR",
            "name": "STKR",
            "protein": "",
            "path": "PK_TKL_STKR.png",
            "members": [
                "ACTR2",
                "ACTR2B",
                "ALK1",
                "ALK2",
                "ALK4",
                "ALK7",
                "BMPR1A",
                "BMPR1B",
                "BMPR2",
                "MISR2",
                "TGFbR1",
                "TGFbR2"
            ],
            "children": [{
                "id": "id654@STKR1",
                "name": "STKR1",
                "members": [
                    "ALK1",
                    "ALK2",
                    "ALK4",
                    "ALK7",
                    "BMPR1A",
                    "BMPR1B",
                    "TGFbR1"
                ],
                "path": "PK_TKL_STKR_STKR1.png"
            },
            {
                "id": "id655@STKR2",
                "name": "STKR2",
                "members": [
                    "ACTR2",
                    "ACTR2B",
                    "BMPR2",
                    "MISR2",
                    "TGFbR2"
                ],
                "path": "PK_TKL_STKR_STKR2.png"
            }
            ]
        },
        {
            "id": "id414@TKL-Unique",
            "name": "TKL-Unique",
            "protein": "",
            "path": "PK_TKL_TKL-Unique.png",
            "members": [
                "MLKL"
            ],
            "children": []
        }
        ]
    },
    {
        "id": "id173@Other",
        "name": "Other",
        "protein": "",
        "path": "PK_Other.png",
        "members": [
            "AAK1",
            "AurA",
            "AurB",
            "AurC",
            "BIKE",
            "BUB1",
            "BUBR1",
            "CDC7",
            "CLIK1",
            "CLIK1L",
            "CaMKK1",
            "CaMKK2",
            "Fused",
            "GAK",
            "GCN2",
            "HRI",
            "Haspin",
            "IKKa",
            "IKKb",
            "IKKe",
            "IRE1",
            "IRE2",
            "KIS",
            "MOS",
            "MPSK1",
            "MYT1",
            "NEK1",
            "NEK10",
            "NEK11",
            "NEK2",
            "NEK3",
            "NEK4",
            "NEK5",
            "NEK6",
            "NEK7",
            "NEK8",
            "NEK9",
            "NRBP1",
            "NRBP2",
            "PAN3",
            "PBK",
            "PEK",
            "PIK3R4",
            "PINK1",
            "PKR",
            "PLK1",
            "PLK2",
            "PLK3",
            "PLK4",
            "PRPK",
            "RNAseL",
            "SBK",
            "SCYL1",
            "SCYL2",
            "SCYL3",
            "SgK069",
            "SgK071",
            "SgK110",
            "SgK196",
            "SgK223",
            "SgK269",
            "SgK307",
            "SgK396",
            "SgK424",
            "SgK493",
            "SgK496",
            "Slob",
            "TBCK",
            "TBK1",
            "TLK1",
            "TLK2",
            "TTK",
            "ULK1",
            "ULK2",
            "ULK3",
            "ULK4",
            "Wee1",
            "Wee1B",
            "Wnk1",
            "Wnk2",
            "Wnk3",
            "Wnk4"
        ],
        "children": [{
            "id": "id416@Aur",
            "name": "Aur",
            "protein": "",
            "path": "PK_Other_Aur.png",
            "members": [
                "AurA",
                "AurB",
                "AurC"
            ],
            "children": []
        },
        {
            "id": "id417@BUB",
            "name": "BUB",
            "protein": "",
            "path": "PK_Other_BUB.png",
            "members": [
                "BUB1",
                "BUBR1"
            ],
            "children": []
        },
        {
            "id": "id418@Bud32",
            "name": "Bud32",
            "protein": "",
            "path": "",
            "members": [
                "PRPK"
            ],
            "children": []
        },
        {
            "id": "id419@CAMKK",
            "name": "CAMKK",
            "protein": "",
            "path": "PK_Other_CAMKK.png",
            "members": [
                "CaMKK1",
                "CaMKK2"
            ],
            "children": [{
                "id": "id662@CAMKK-Meta",
                "name": "CAMKK-Meta",
                "members": [
                    "CaMKK1",
                    "CaMKK2"
                ],
                "path": "PK_Other_CAMKK_CAMKK-Meta.png"
            }]
        },
        {
            "id": "id421@CDC7",
            "name": "CDC7",
            "protein": "",
            "path": "PK_Other_CDC7.png",
            "members": [
                "CDC7"
            ],
            "children": []
        },
        {
            "id": "id422@Dusty",
            "name": "Dusty",
            "protein": "",
            "path": "PK_Other_Dusty.png",
            "members": [
                "SgK496"
            ],
            "children": []
        },
        {
            "id": "id423@Haspin",
            "name": "Haspin",
            "protein": "",
            "path": "",
            "members": [
                "Haspin"
            ],
            "children": []
        },
        {
            "id": "id424@IKK",
            "name": "IKK",
            "protein": "",
            "path": "PK_Other_IKK.png",
            "members": [
                "IKKa",
                "IKKb",
                "IKKe",
                "TBK1"
            ],
            "children": []
        },
        {
            "id": "id425@IRE",
            "name": "IRE",
            "protein": "",
            "path": "PK_Other_IRE.png",
            "members": [
                "IRE1",
                "IRE2"
            ],
            "children": []
        },
        {
            "id": "id426@KIS",
            "name": "KIS",
            "protein": "",
            "path": "PK_Other_KIS.png",
            "members": [
                "KIS"
            ],
            "children": []
        },
        {
            "id": "id427@MOS",
            "name": "MOS",
            "protein": "",
            "path": "PK_Other_MOS.png",
            "members": [
                "MOS"
            ],
            "children": []
        },
        {
            "id": "id428@NAK",
            "name": "NAK",
            "protein": "",
            "path": "PK_Other_NAK.png",
            "members": [
                "AAK1",
                "BIKE",
                "GAK",
                "MPSK1"
            ],
            "children": []
        },
        {
            "id": "id429@NEK",
            "name": "NEK",
            "protein": "",
            "path": "PK_Other_NEK.png",
            "members": [
                "NEK1",
                "NEK10",
                "NEK11",
                "NEK2",
                "NEK3",
                "NEK4",
                "NEK5",
                "NEK6",
                "NEK7",
                "NEK8",
                "NEK9"
            ],
            "children": []
        },
        {
            "id": "id430@NKF1",
            "name": "NKF1",
            "protein": "",
            "path": "PK_Other_NKF1.png",
            "members": [
                "SBK",
                "SgK069",
                "SgK110"
            ],
            "children": []
        },
        {
            "id": "id431@NKF2",
            "name": "NKF2",
            "protein": "",
            "path": "PK_Other_NKF2.png",
            "members": [
                "PINK1"
            ],
            "children": []
        },
        {
            "id": "id432@NKF3",
            "name": "NKF3",
            "protein": "",
            "path": "PK_Other_NKF3.png",
            "members": [
                "SgK223",
                "SgK269"
            ],
            "children": []
        },
        {
            "id": "id433@NKF4",
            "name": "NKF4",
            "protein": "",
            "path": "PK_Other_NKF4.png",
            "members": [
                "CLIK1",
                "CLIK1L"
            ],
            "children": []
        },
        {
            "id": "id434@NKF5",
            "name": "NKF5",
            "protein": "",
            "path": "PK_Other_NKF5.png",
            "members": [
                "SgK307",
                "SgK424"
            ],
            "children": []
        },
        {
            "id": "id435@NRBP",
            "name": "NRBP",
            "protein": "",
            "path": "PK_Other_NRBP.png",
            "members": [
                "NRBP1",
                "NRBP2"
            ],
            "children": []
        },
        {
            "id": "id436@PAN3",
            "name": "PAN3",
            "protein": "",
            "path": "PK_Other_PAN3.png",
            "members": [
                "PAN3"
            ],
            "children": []
        },
        {
            "id": "id437@PEK",
            "name": "PEK",
            "protein": "",
            "path": "PK_Other_PEK.png",
            "members": [
                "GCN2",
                "HRI",
                "PEK",
                "PKR"
            ],
            "children": [{
                "id": "id680@GCN2",
                "name": "GCN2",
                "members": [
                    "GCN2"
                ],
                "path": "PK_Other_PEK_GCN2.png"
            },
            {
                "id": "id681@PEK",
                "name": "PEK",
                "members": [
                    "PEK"
                ],
                "path": "PK_Other_PEK_PEK.png"
            }
            ]
        },
        {
            "id": "id440@PLK",
            "name": "PLK",
            "protein": "",
            "path": "PK_Other_PLK.png",
            "members": [
                "PLK1",
                "PLK2",
                "PLK3",
                "PLK4"
            ],
            "children": []
        },
        {
            "id": "id441@SCY1",
            "name": "SCY1",
            "protein": "",
            "path": "PK_Other_SCY1.png",
            "members": [
                "SCYL1",
                "SCYL2",
                "SCYL3"
            ],
            "children": []
        },
        {
            "id": "id442@SgK071",
            "name": "SgK071",
            "protein": "",
            "path": "PK_Other_SgK071.png",
            "members": [
                "SgK071"
            ],
            "children": []
        },
        {
            "id": "id443@SgK493",
            "name": "SgK493",
            "protein": "",
            "path": "PK_Other_SgK493.png",
            "members": [
                "SgK493"
            ],
            "children": []
        },
        {
            "id": "id444@Slob",
            "name": "Slob",
            "protein": "",
            "path": "PK_Other_Slob.png",
            "members": [
                "Slob"
            ],
            "children": []
        },
        {
            "id": "id445@TBCK",
            "name": "TBCK",
            "protein": "",
            "path": "PK_Other_TBCK.png",
            "members": [
                "TBCK"
            ],
            "children": []
        },
        {
            "id": "id446@TLK",
            "name": "TLK",
            "protein": "",
            "path": "PK_Other_TLK.png",
            "members": [
                "TLK1",
                "TLK2"
            ],
            "children": []
        },
        {
            "id": "id447@TOPK",
            "name": "TOPK",
            "protein": "",
            "path": "PK_Other_TOPK.png",
            "members": [
                "PBK"
            ],
            "children": []
        },
        {
            "id": "id448@TTK",
            "name": "TTK",
            "protein": "",
            "path": "PK_Other_TTK.png",
            "members": [
                "TTK"
            ],
            "children": []
        },
        {
            "id": "id449@ULK",
            "name": "ULK",
            "protein": "",
            "path": "PK_Other_ULK.png",
            "members": [
                "Fused",
                "ULK1",
                "ULK2",
                "ULK3",
                "ULK4"
            ],
            "children": []
        },
        {
            "id": "id450@VPS15",
            "name": "VPS15",
            "protein": "",
            "path": "PK_Other_VPS15.png",
            "members": [
                "PIK3R4"
            ],
            "children": []
        },
        {
            "id": "id451@WEE",
            "name": "WEE",
            "protein": "",
            "path": "PK_Other_WEE.png",
            "members": [
                "MYT1",
                "Wee1",
                "Wee1B"
            ],
            "children": []
        },
        {
            "id": "id452@WNK",
            "name": "WNK",
            "protein": "",
            "path": "PK_Other_WNK.png",
            "members": [
                "Wnk1",
                "Wnk2",
                "Wnk3",
                "Wnk4"
            ],
            "children": []
        },
        {
            "id": "id453@Other-Unique",
            "name": "Other-Unique",
            "protein": "",
            "path": "PK_Other_Other-Unique.png",
            "members": [
                "RNAseL",
                "SgK196",
                "SgK396"
            ],
            "children": []
        }
        ]
    },
    {
        "id": "id212@Atypical",
        "name": "Atypical",
        "protein": "",
        "path": "PK_Atypical.png",
        "members": [
            "ABR",
            "ADCK1",
            "ADCK2",
            "ADCK3",
            "ADCK4",
            "ADCK5",
            "ATM",
            "ATR",
            "AlphaK1",
            "AlphaK2",
            "AlphaK3",
            "BAZ1A",
            "BAZ1B",
            "BCKDK",
            "BCR",
            "BLVRA",
            "BRD2",
            "BRD3",
            "BRD4",
            "BRDT",
            "ChaK1",
            "ChaK2",
            "Col4A3BP",
            "DNAPK",
            "FASTK",
            "FRAP",
            "G11",
            "GTF2F1",
            "PDHK1",
            "PDHK2",
            "PDHK3",
            "PDHK4",
            "RIOK1",
            "RIOK2",
            "RIOK3",
            "SMG1",
            "TAF1",
            "TAF1L",
            "TIF1D",
            "TIF1a",
            "TIF1b",
            "TIF1g",
            "TRRAP",
            "eEF2K"
        ],
        "children": [{
            "id": "id455@ABC1",
            "name": "ABC1",
            "protein": "",
            "path": "PK_Atypical_ABC1.png",
            "members": [
                "ADCK1",
                "ADCK2",
                "ADCK3",
                "ADCK4",
                "ADCK5"
            ],
            "children": [{
                "id": "id698@ABC1-A",
                "name": "ABC1-A",
                "members": [
                    "ADCK3",
                    "ADCK4"
                ],
                "path": ""
            },
            {
                "id": "id699@ABC1-B",
                "name": "ABC1-B",
                "members": [
                    "ADCK1"
                ],
                "path": "PK_Atypical_ABC1_ABC1-B.png"
            },
            {
                "id": "id700@ABC1-C",
                "name": "ABC1-C",
                "members": [
                    "ADCK2"
                ],
                "path": ""
            },
            {
                "id": "id701@ABC1-D",
                "name": "ABC1-D",
                "members": [
                    "ADCK5"
                ],
                "path": "PK_Atypical_ABC1_ABC1-D.png"
            }
            ]
        },
        {
            "id": "id460@Alpha",
            "name": "Alpha",
            "protein": "",
            "path": "",
            "members": [
                "AlphaK1",
                "AlphaK2",
                "AlphaK3",
                "ChaK1",
                "ChaK2",
                "eEF2K"
            ],
            "children": [{
                "id": "id703@ChaK",
                "name": "ChaK",
                "members": [
                    "ChaK1",
                    "ChaK2"
                ],
                "path": ""
            },
            {
                "id": "id704@eEF2K",
                "name": "eEF2K",
                "members": [
                    "eEF2K"
                ],
                "path": ""
            }
            ]
        },
        {
            "id": "id463@BAZ",
            "name": "BAZ",
            "protein": "",
            "path": "",
            "members": [
                "BAZ1A",
                "BAZ1B"
            ],
            "children": []
        },
        {
            "id": "id464@BCR",
            "name": "BCR",
            "protein": "",
            "path": "",
            "members": [
                "ABR",
                "BCR"
            ],
            "children": []
        },
        {
            "id": "id465@BLVRA",
            "name": "BLVRA",
            "protein": "",
            "path": "",
            "members": [
                "BLVRA"
            ],
            "children": []
        },
        {
            "id": "id466@BRD",
            "name": "BRD",
            "protein": "",
            "path": "",
            "members": [
                "BRD2",
                "BRD3",
                "BRD4",
                "BRDT"
            ],
            "children": []
        },
        {
            "id": "id467@Col4A3BP",
            "name": "Col4A3BP",
            "protein": "",
            "path": "",
            "members": [
                "Col4A3BP"
            ],
            "children": []
        },
        {
            "id": "id468@FAST",
            "name": "FAST",
            "protein": "",
            "path": "",
            "members": [
                "FASTK"
            ],
            "children": []
        },
        {
            "id": "id469@G11",
            "name": "G11",
            "protein": "",
            "path": "",
            "members": [
                "G11"
            ],
            "children": []
        },
        {
            "id": "id470@GTF2F1",
            "name": "GTF2F1",
            "protein": "",
            "path": "",
            "members": [
                "GTF2F1"
            ],
            "children": []
        },
        {
            "id": "id471@PDHK",
            "name": "PDHK",
            "protein": "",
            "path": "",
            "members": [
                "BCKDK",
                "PDHK1",
                "PDHK2",
                "PDHK3",
                "PDHK4"
            ],
            "children": []
        },
        {
            "id": "id472@PIKK",
            "name": "PIKK",
            "protein": "",
            "path": "",
            "members": [
                "ATM",
                "ATR",
                "DNAPK",
                "FRAP",
                "SMG1",
                "TRRAP"
            ],
            "children": [{
                "id": "id715@ATM",
                "name": "ATM",
                "members": [
                    "ATM"
                ],
                "path": ""
            },
            {
                "id": "id716@ATR",
                "name": "ATR",
                "members": [
                    "ATR"
                ],
                "path": ""
            },
            {
                "id": "id717@DNAPK",
                "name": "DNAPK",
                "members": [
                    "DNAPK"
                ],
                "path": ""
            },
            {
                "id": "id718@FRAP",
                "name": "FRAP",
                "members": [
                    "FRAP"
                ],
                "path": ""
            },
            {
                "id": "id719@SMG1",
                "name": "SMG1",
                "members": [
                    "SMG1"
                ],
                "path": ""
            },
            {
                "id": "id720@TRRAP",
                "name": "TRRAP",
                "members": [
                    "TRRAP"
                ],
                "path": ""
            }
            ]
        },
        {
            "id": "id479@RIO",
            "name": "RIO",
            "protein": "",
            "path": "",
            "members": [
                "RIOK1",
                "RIOK2",
                "RIOK3"
            ],
            "children": [{
                "id": "id722@RIO1",
                "name": "RIO1",
                "members": [
                    "RIOK1"
                ],
                "path": ""
            },
            {
                "id": "id723@RIO2",
                "name": "RIO2",
                "members": [
                    "RIOK2"
                ],
                "path": ""
            },
            {
                "id": "id724@RIO3",
                "name": "RIO3",
                "members": [
                    "RIOK3"
                ],
                "path": ""
            }
            ]
        },
        {
            "id": "id483@TAF1",
            "name": "TAF1",
            "protein": "",
            "path": "",
            "members": [
                "TAF1",
                "TAF1L"
            ],
            "children": []
        },
        {
            "id": "id484@TIF1",
            "name": "TIF1",
            "protein": "",
            "path": "",
            "members": [
                "TIF1D",
                "TIF1a",
                "TIF1b",
                "TIF1g"
            ],
            "children": []
        }
        ]

    }
    ]
}

function DendrogramMenuFunc(props) {
    const d3Container = useRef(null);
    //const classes = useStyles();

    /* The useEffect Hook is for running side effects outside of React,
    for instance inserting elements into the DOM using D3 */
    useEffect(
        () => {
            if (props.width && props.height) {
                const handleNodeClick = node => {
                    if (props.onNodeClick) {
                      props.onNodeClick(node.d.data);
                    }
                  };
                  const handleLabelClick = node => {
                    if (props.onLabelClick) {
                      props.onLabelClick(node.d.data);
                    }
                  };

                // Set the dimensions and margins of the diagram
                let margin = { top: 20, right: 90, bottom: 30, left: 90 },
                    width = props.width - margin.left - margin.right,
                    height = props.height - margin.top - margin.bottom;
                //d3.selectAll("svg > *").remove();
                
                const svg = d3.select(d3Container.current)
                    .attr("width", width + margin.right + margin.left)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                let i = 0,
                    duration = 750,
                    root;

                // declares a tree layout and assigns the size
                let treemap = d3.tree().size([height, width]);
                // Assigns parent, children, height, depth
                root = d3.hierarchy(treeData, function (d) { return d.children; });
                root.x0 = height / 2;
                root.y0 = 0;

                // Collapse after the second level
                root.children.forEach(collapse);


                update(root);

                // Collapse the node and all it's children
                function collapse(d) {
                    if (d.children) {
                        d._children = d.children
                        d._children.forEach(collapse)
                        d.children = null
                    }
                }

                function update(source) {

                    // Assigns the x and y position for the nodes
                    var treeData = treemap(root);

                    // Compute the new tree layout.
                    var nodes = treeData.descendants(),
                        links = treeData.descendants().slice(1);

                    // Normalize for fixed-depth.
                    nodes.forEach(function (d) { d.y = d.depth * 180 });

                    // ****************** Nodes section ***************************

                    // Update the nodes...
                    var node = svg.selectAll('g.node')
                        .data(nodes, function (d) { return d.id || (d.id = ++i); });

                    // Enter any new modes at the parent's previous position.
                    var nodeEnter = node.enter().append('g')
                        .attr('class', 'node')
                        .attr("transform", function (d) {
                            return "translate(" + source.y0 + "," + source.x0 + ")";
                        });
                        //.call(drag)
                        

                    //var nodePlus = nodeEnter.enter().append()

                    // Add Circle for the nodes
                    nodeEnter.append('circle')
                        .attr('class', 'node')
                        .attr('r', 1e-6)
                        .style("fill", function (d) {
                            return d._children ? "#b0c4de" : "#fff";
                        }).on("click", click);
                    // nodeEnter.append('circle')
                    // .attr('class', classes.nodecircle)
                    // .attr('r', 1e-6)
                    // .style("fill", function(d) {
                    //     return d._children ? "#b0c4de" : "#fff";
                    // });

                    // nodeEnter.append("image")
                    //     .attr("xlink:href", "https://github.com/favicon.ico")
                    //     .attr("x", -8)
                    //     .attr("y", 10)
                    //     .attr("width", 16)
                    //     .attr("height", 16)

                    // Add labels for the nodes
                    
                    nodeEnter.append('text')
                        .on("click", textclick)
                        .attr("dy", ".35em")
                        .attr("x", function (d) {
                            return d.children || d._children ? -13 : 13;
                        })
                        .attr("text-anchor", function (d) {
                            return d.children || d._children ? "end" : "start";
                        })
                        .text(function (d) {
                            return d.data.name;
                        })
                        .append("div").attr("background-color","red");

                    // UPDATE
                    var nodeUpdate = nodeEnter.merge(node);

                    // Transition to the proper position for the node
                    nodeUpdate.transition()
                        .duration(duration)
                        .attr("transform", function (d) {
                            return "translate(" + d.y + "," + d.x + ")";
                        });

                    // Update the node attributes and style
                    nodeUpdate.select('circle.node')
                        .attr('r', 10)
                        .style('fill', (d) => {
                            
                            return d._children ? "#b0c4de" : "#fff";
                        })
                        .attr('cursor', 'pointer');


                    // Remove any exiting nodes
                    var nodeExit = node.exit().transition()
                        .duration(duration)
                        .attr("transform", function (d) {
                            return "translate(" + source.y + "," + source.x + ")";
                        })
                        .remove();

                    // On exit reduce the node circles size to 0
                    nodeExit.select('circle')
                        .attr('r', 1e-6);

                    // On exit reduce the opacity of text labels
                    nodeExit.select('text')
                        .style('fill-opacity', 1e-6);

                    // ****************** links section ***************************

                    // Update the links...
                    var link = svg.selectAll('path.link')
                        .data(links, function (d) { return d.id; });

                    // Enter any new links at the parent's previous position.
                    var linkEnter = link.enter().insert('path', "g")
                        .attr("class", "link")
                        .attr('d', function (d) {
                            var o = { x: source.x0, y: source.y0 }
                            return diagonal(o, o)
                        });

                    // UPDATE
                    var linkUpdate = linkEnter.merge(link);

                    // Transition back to the parent element position
                    linkUpdate.transition()
                        .duration(duration)
                        .attr('d', function (d) { return diagonal(d, d.parent) });

                    // Remove any exiting links
                    var linkExit = link.exit().transition()
                        .duration(duration)
                        .attr('d', function (d) {
                            var o = { x: source.x, y: source.y }
                            return diagonal(o, o)
                        })
                        .remove();

                    // Store the old positions for transition.
                    nodes.forEach(function (d) {
                        d.x0 = d.x;
                        d.y0 = d.y;
                    });

                    // Creates a curved (diagonal) path from parent to the child nodes
                    function diagonal(s, d) {

                        let path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`

                        return path
                    }

                    // Toggle children on click.
                    function click(d) {
                        handleNodeClick({ d });
                        
                        //expand collapse
                        if (d.children) {
                            d._children = d.children;
                            d.children = null;
                        } else {
                            d.children = d._children;
                            d._children = null;
                        }
                        update(d);
                    }
                    function textclick(d)
                    {
                        handleLabelClick({ d });
                    }
                }


                //Medium ###
                // // Enter new D3 elements
                // update.enter()
                //     .append('text')
                //     .attr('x', (d, i) => i * 25)
                //     .attr('y', 40)
                //     .style('font-size', 24)
                //     .text((d: number) => d);

                // // Update existing D3 elements
                // update
                //     .attr('x', (d, i) => i * 40)
                //     .text((d: number) => d);

                // // Remove old D3 elements
                // update.exit()
                //     .remove();
                // ###
            }
        },

        /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
        [props.width, props.height, props.onNodeClick, d3Container.current]);


    return (<svg ref={d3Container} width={400} height={300} >

    </svg>);
}
function memoize()
{
    //because we don't want to re-render the dendrogram
    return true;
}
const DendrogramMenu = React.memo(DendrogramMenuFunc,memoize);
export default DendrogramMenu;