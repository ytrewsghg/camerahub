const cameraImages = [
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1502920917128-1aae5735790e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1606986628253-49b7b8e3c5e5?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1617005056414-37e1b5a28257?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1608572511190-3e33859a8fb0?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1608337508068-3e8a54617ee0?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1580912188499-673a5c6d677f?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1526170375445-08c4f6d4055a?w=400&h=300&fit=crop'
]

const brands = ['Sony', 'Canon', 'Nikon', 'Fuji', 'DJI', 'Panasonic', 'Leica', 'Hasselblad']

export const rentalDevices = [
  { id: 1, name: 'Sony A7M4', brand: 'Sony', model: 'A7M4', category: '微单', price: 299, deposit: 5000, rating: 4.9, stock: 8, image: cameraImages[0], specs: { sensor: '3300万像素全画幅', video: '4K 60fps', iso: '100-51200', weight: '652g', af: '759个相位对焦点', stabilizer: '5轴防抖' }, description: '全画幅微单新标杆，双卡槽设计，专业视频与照片双修。', tags: ['热门', '全画幅'] },
  { id: 2, name: 'Sony A7R5', brand: 'Sony', model: 'A7R5', category: '微单', price: 399, deposit: 8000, rating: 4.8, stock: 5, image: cameraImages[1], specs: { sensor: '6100万像素全画幅', video: '8K 24fps', iso: '100-32000', weight: '723g', af: 'AI芯片对焦', stabilizer: '8级防抖' }, description: '超高像素旗舰，AI对焦芯片，商业摄影首选。', tags: ['旗舰', '高像素'] },
  { id: 3, name: 'Sony A7C2', brand: 'Sony', model: 'A7C2', category: '微单', price: 249, deposit: 4500, rating: 4.7, stock: 12, image: cameraImages[2], specs: { sensor: '3300万像素全画幅', video: '4K 30fps', iso: '100-51200', weight: '514g', af: '759个对焦点', stabilizer: '5轴防抖' }, description: '轻便全画幅，旅行Vlog最佳伴侣。', tags: ['轻便', 'Vlog'] },
  { id: 4, name: 'Sony FX3', brand: 'Sony', model: 'FX3', category: '电影机', price: 499, deposit: 10000, rating: 4.9, stock: 3, image: cameraImages[3], specs: { sensor: '1210万像素全画幅', video: '4K 120fps', iso: '80-409600', weight: '715g', af: 'Fast Hybrid AF', stabilizer: '5轴防抖' }, description: '专业电影拍摄，S-Log3色彩，无限录制。', tags: ['专业', '电影'] },
  { id: 5, name: 'Canon R6 II', brand: 'Canon', model: 'R6 II', category: '微单', price: 349, deposit: 6000, rating: 4.8, stock: 6, image: cameraImages[4], specs: { sensor: '2420万像素全画幅', video: '4K 60fps', iso: '100-102400', weight: '670g', af: '双像素CMOS AF II', stabilizer: '8级防抖' }, description: '全能旗舰，高速连拍，出色对焦与视频。', tags: ['热门', '全能'] },
  { id: 6, name: 'Canon R5', brand: 'Canon', model: 'R5', category: '微单', price: 449, deposit: 8000, rating: 4.7, stock: 4, image: cameraImages[5], specs: { sensor: '4500万像素全画幅', video: '8K 30fps', iso: '100-51200', weight: '738g', af: '双像素CMOS AF II', stabilizer: '8级防抖' }, description: '高像素旗舰，8K录制，专业影像创作。', tags: ['高像素', '8K'] },
  { id: 7, name: 'Canon R8', brand: 'Canon', model: 'R8', category: '微单', price: 279, deposit: 4500, rating: 4.6, stock: 9, image: cameraImages[6], specs: { sensor: '2420万像素全画幅', video: '4K 60fps', iso: '100-102400', weight: '461g', af: '双像素CMOS AF II', stabilizer: '无' }, description: '轻量全画幅入门首选，高性价比。', tags: ['入门', '轻便'] },
  { id: 8, name: 'Nikon Z8', brand: 'Nikon', model: 'Z8', category: '微单', price: 429, deposit: 8000, rating: 4.9, stock: 5, image: cameraImages[7], specs: { sensor: '4571万像素全画幅', video: '8K 30fps', iso: '64-25600', weight: '910g', af: '493点对焦', stabilizer: '6轴防抖' }, description: '尼康旗舰，8K N-RAW录制，专业首选。', tags: ['旗舰', '专业'] },
  { id: 9, name: 'Nikon Z6 III', brand: 'Nikon', model: 'Z6 III', category: '微单', price: 329, deposit: 5500, rating: 4.7, stock: 7, image: cameraImages[8], specs: { sensor: '2450万像素部分层', video: '6K 60fps', iso: '100-64000', weight: '760g', af: 'Expeed 7', stabilizer: '8级防抖' }, description: '部分堆栈式传感器，视频性能大幅提升。', tags: ['新品', '视频'] },
  { id: 10, name: 'Nikon Zf', brand: 'Nikon', model: 'Zf', category: '微单', price: 299, deposit: 5000, rating: 4.8, stock: 6, image: cameraImages[9], specs: { sensor: '2450万像素全画幅', video: '4K 30fps', iso: '100-64000', weight: '710g', af: 'Expeed 7', stabilizer: '8级防抖' }, description: '复古外观，现代内核，颜值与实力并存。', tags: ['复古', '颜值'] },
  { id: 11, name: 'Fuji XT5', brand: 'Fuji', model: 'XT5', category: '微单', price: 279, deposit: 4500, rating: 4.8, stock: 10, image: cameraImages[0], specs: { sensor: '4020万像素APS-C', video: '6.2K 30fps', iso: '125-12800', weight: '557g', af: '智能对焦', stabilizer: '7级防抖' }, description: '胶片模拟王者，直出即成片。', tags: ['胶片', '直出'] },
  { id: 12, name: 'Fuji XH2S', brand: 'Fuji', model: 'XH2S', category: '微单', price: 329, deposit: 5500, rating: 4.6, stock: 5, image: cameraImages[1], specs: { sensor: '2616万像素APS-C层叠', video: '6.2K 30fps', iso: '160-12800', weight: '660g', af: '智能对焦', stabilizer: '7级防抖' }, description: '富士速度旗舰，40fps连拍，运动拍摄利器。', tags: ['速度', '运动'] },
  { id: 13, name: 'Fuji X100VI', brand: 'Fuji', model: 'X100VI', category: '卡片机', price: 349, deposit: 6000, rating: 4.9, stock: 3, image: cameraImages[2], specs: { sensor: '4020万像素APS-C', video: '6.2K 30fps', iso: '125-12800', weight: '521g', af: '智能对焦', stabilizer: '6级防抖' }, description: '现象级街拍神机，一机难求。', tags: ['网红', '街拍'] },
  { id: 14, name: 'DJI Pocket 3', brand: 'DJI', model: 'Pocket 3', category: '云台相机', price: 129, deposit: 2000, rating: 4.8, stock: 15, image: cameraImages[3], specs: { sensor: '1英寸CMOS', video: '4K 120fps', iso: '无', weight: '179g', af: '全像素对焦', stabilizer: '3轴云台' }, description: '口袋云台相机，Vlog神器，自带美颜。', tags: ['Vlog', '轻便'] },
  { id: 15, name: 'DJI RS4', brand: 'DJI', model: 'RS4', category: '稳定器', price: 99, deposit: 1500, rating: 4.7, stock: 12, image: cameraImages[4], specs: { sensor: '无', video: '无', iso: '无', weight: '1490g', af: '无', stabilizer: '3轴增稳' }, description: '专业手持稳定器，自动轴锁，快速部署。', tags: ['稳定器', '专业'] },
  { id: 16, name: 'DJI Mavic 3 Pro', brand: 'DJI', model: 'Mavic 3 Pro', category: '无人机', price: 399, deposit: 8000, rating: 4.9, stock: 4, image: cameraImages[5], specs: { sensor: '4/3英寸CMOS三摄', video: '5.1K 50fps', iso: '无', weight: '958g', af: '全向避障', stabilizer: '3轴云台' }, description: '旗舰三摄无人机，哈苏色彩，全向避障。', tags: ['无人机', '旗舰'] },
  { id: 17, name: 'Panasonic S5IIX', brand: 'Panasonic', model: 'S5IIX', category: '微单', price: 279, deposit: 5000, rating: 4.7, stock: 7, image: cameraImages[6], specs: { sensor: '2420万像素全画幅', video: '6K 30fps', iso: '100-51200', weight: '740g', af: '相位混合AF', stabilizer: '5轴防抖' }, description: '视频利器，6K录制，直播推流功能。', tags: ['视频', '直播'] },
  { id: 18, name: 'Panasonic GH6', brand: 'Panasonic', model: 'GH6', category: '微单', price: 249, deposit: 4500, rating: 4.6, stock: 8, image: cameraImages[7], specs: { sensor: '2520万像素M4/3', video: '5.7K 60fps', iso: '100-25600', weight: '739g', af: '反差AF', stabilizer: '7.5级防抖' }, description: 'M4/3视频旗舰，超强防抖，小巧镜头群。', tags: ['视频', 'M4/3'] },
  { id: 19, name: 'Leica Q3', brand: 'Leica', model: 'Q3', category: '卡片机', price: 599, deposit: 15000, rating: 4.9, stock: 2, image: cameraImages[8], specs: { sensor: '6030万像素全画幅', video: '8K 30fps', iso: '50-100000', weight: '743g', af: '相位+反差', stabilizer: '无' }, description: '徕卡品质，Summilux 28mm f/1.7，极致影像。', tags: ['徕卡', '奢华'] },
  { id: 20, name: 'Hasselblad X2D', brand: 'Hasselblad', model: 'X2D', category: '中画幅', price: 799, deposit: 25000, rating: 4.8, stock: 1, image: cameraImages[9], specs: { sensor: '1亿像素中画幅', video: '无', iso: '64-25600', weight: '895g', af: '反差AF', stabilizer: '无' }, description: '中画幅传奇，1亿像素，哈苏自然色彩。', tags: ['中画幅', '极致'] }
]

export const secondHandItems = [
  { id: 1, name: 'Sony A7M3', brand: 'Sony', model: 'A7M3', category: '微单', price: 8999, originalPrice: 14999, condition: '9成新', conditionScore: 90, shutterCount: 28000, useYears: 2, seller: { id: 1, name: '摄影师小王', avatar: '👤', rating: 4.9, sales: 15 }, description: '自用A7M3，成色极新，快门2.8万次，屏幕贴膜从未撕掉，所有配件齐全。', images: [cameraImages[0], cameraImages[1]], tags: ['个人闲置', '配件齐全'], createdAt: '2026-05-20' },
  { id: 2, name: 'Canon R6', brand: 'Canon', model: 'R6', category: '微单', price: 9999, originalPrice: 16999, condition: '95新', conditionScore: 95, shutterCount: 12000, useYears: 1, seller: { id: 2, name: '影视工作者', avatar: '👨‍💼', rating: 4.8, sales: 8 }, description: '佳能R6一代，快门仅1.2万次，几乎全新，箱说全在。', images: [cameraImages[4], cameraImages[5]], tags: ['几乎全新', '箱说齐全'], createdAt: '2026-05-18' },
  { id: 3, name: 'Nikon Z7II', brand: 'Nikon', model: 'Z7II', category: '微单', price: 12999, originalPrice: 19999, condition: '9成新', conditionScore: 88, shutterCount: 35000, useYears: 2, seller: { id: 3, name: '风光摄影师', avatar: '👩‍🎨', rating: 4.7, sales: 22 }, description: '风光摄影主力机，双卡槽，正常使用痕迹，功能一切正常。', images: [cameraImages[7], cameraImages[8]], tags: ['风光利器', '双卡槽'], createdAt: '2026-05-15' },
  { id: 4, name: 'Fuji XT4', brand: 'Fuji', model: 'XT4', category: '微单', price: 6999, originalPrice: 11999, condition: '8成新', conditionScore: 80, shutterCount: 45000, useYears: 3, seller: { id: 4, name: '胶片爱好者', avatar: '📷', rating: 4.6, sales: 5 }, description: 'XT4经典胶片模拟，战损版但功能完好，适合入门。', images: [cameraImages[0], cameraImages[2]], tags: ['胶片模拟', '入门推荐'], createdAt: '2026-05-12' },
  { id: 5, name: 'Sony A7R4', brand: 'Sony', model: 'A7R4', category: '微单', price: 11999, originalPrice: 20999, condition: '95新', conditionScore: 95, shutterCount: 8000, useYears: 1, seller: { id: 5, name: '商业摄影师', avatar: '🎯', rating: 4.9, sales: 30 }, description: '6100万像素商业利器，快门极少，近乎全新。', images: [cameraImages[1], cameraImages[3]], tags: ['高像素', '商业摄影'], createdAt: '2026-05-10' },
  { id: 6, name: 'DJI Mavic 3', brand: 'DJI', model: 'Mavic 3', category: '无人机', price: 7999, originalPrice: 13888, condition: '9成新', conditionScore: 90, shutterCount: 0, useYears: 1, seller: { id: 6, name: '航拍达人', avatar: '🚁', rating: 4.8, sales: 12 }, description: '御3经典版，哈苏镜头，飞行时长约50小时，遥控器屏幕版。', images: [cameraImages[5], cameraImages[6]], tags: ['哈苏镜头', '航拍'], createdAt: '2026-05-08' },
  { id: 7, name: 'Canon R5C', brand: 'Canon', model: 'R5C', category: '微单', price: 15999, originalPrice: 26999, condition: '95新', conditionScore: 93, shutterCount: 15000, useYears: 1, seller: { id: 7, name: '独立导演', avatar: '🎬', rating: 4.9, sales: 18 }, description: 'R5C视频专业版，内置散热风扇，无录制限制，影视制作首选。', images: [cameraImages[5], cameraImages[4]], tags: ['专业视频', '散热'], createdAt: '2026-05-05' },
  { id: 8, name: 'Fuji X100V', brand: 'Fuji', model: 'X100V', category: '卡片机', price: 8499, originalPrice: 9799, condition: '9成新', conditionScore: 88, shutterCount: 20000, useYears: 2, seller: { id: 8, name: '街拍达人', avatar: '📸', rating: 4.7, sales: 6 }, description: '网红街拍机，经典复古外观，胶片模拟出色。', images: [cameraImages[2], cameraImages[9]], tags: ['街拍', '网红'], createdAt: '2026-05-03' },
  { id: 9, name: 'Nikon Z9', brand: 'Nikon', model: 'Z9', category: '微单', price: 24999, originalPrice: 35999, condition: '9成新', conditionScore: 90, shutterCount: 40000, useYears: 2, seller: { id: 3, name: '体育摄影师', avatar: '⚽', rating: 4.9, sales: 22 }, description: '尼康旗舰Z9，120fps连拍，8K录制，体育赛事利器。', images: [cameraImages[7], cameraImages[8]], tags: ['旗舰', '高速'], createdAt: '2026-04-28' },
  { id: 10, name: 'Sony FX30', brand: 'Sony', model: 'FX30', category: '电影机', price: 9999, originalPrice: 14999, condition: '95新', conditionScore: 95, shutterCount: 0, useYears: 1, seller: { id: 9, name: '视频创作者', avatar: '🎥', rating: 4.8, sales: 14 }, description: 'APS-C电影机，S-Log3，专业视频制作入门首选。', images: [cameraImages[3], cameraImages[6]], tags: ['电影机', 'S-Log3'], createdAt: '2026-04-25' },
  { id: 11, name: 'Leica M11', brand: 'Leica', model: 'M11', category: '旁轴', price: 39999, originalPrice: 56800, condition: '9成新', conditionScore: 88, shutterCount: 10000, useYears: 1, seller: { id: 10, name: '徕卡玩家', avatar: '🎭', rating: 5.0, sales: 3 }, description: '徕卡M11，6000万像素，旁轴之巅，收藏级成色。', images: [cameraImages[8], cameraImages[9]], tags: ['徕卡', '收藏级'], createdAt: '2026-04-20' },
  { id: 12, name: 'Panasonic S5II', brand: 'Panasonic', model: 'S5II', category: '微单', price: 9999, originalPrice: 14998, condition: '9成新', conditionScore: 90, shutterCount: 18000, useYears: 1, seller: { id: 6, name: '直播主播', avatar: '🎙️', rating: 4.7, sales: 12 }, description: '松下S5II，相位对焦，6K录制，直播神器。', images: [cameraImages[6], cameraImages[7]], tags: ['直播', '相位对焦'], createdAt: '2026-04-18' },
  { id: 13, name: 'DJI Osmo Action 4', brand: 'DJI', model: 'Osmo Action 4', category: '运动相机', price: 1999, originalPrice: 2598, condition: '9成新', conditionScore: 90, shutterCount: 0, useYears: 1, seller: { id: 7, name: '极限运动', avatar: '⛷️', rating: 4.6, sales: 18 }, description: '大疆运动相机，1/1.3英寸传感器，超强暗光表现。', images: [cameraImages[3], cameraImages[4]], tags: ['运动', '防水'], createdAt: '2026-04-15' },
  { id: 14, name: 'Canon R3', brand: 'Canon', model: 'R3', category: '微单', price: 22999, originalPrice: 36999, condition: '95新', conditionScore: 93, shutterCount: 25000, useYears: 1, seller: { id: 5, name: '新闻摄影师', avatar: '📰', rating: 4.9, sales: 30 }, description: '佳能R3旗舰，30fps连拍，眼控对焦，新闻体育利器。', images: [cameraImages[4], cameraImages[5]], tags: ['旗舰', '眼控'], createdAt: '2026-04-12' },
  { id: 15, name: 'Sony A1', brand: 'Sony', model: 'A1', category: '微单', price: 34999, originalPrice: 49999, condition: '9成新', conditionScore: 88, shutterCount: 30000, useYears: 2, seller: { id: 5, name: '野生动物摄影师', avatar: '🦁', rating: 4.9, sales: 30 }, description: '索尼旗舰A1，5010万像素+30fps连拍，速度与像素兼得。', images: [cameraImages[0], cameraImages[1]], tags: ['旗舰', '速度像素兼得'], createdAt: '2026-04-10' },
  { id: 16, name: 'Fuji GFX100S', brand: 'Fuji', model: 'GFX100S', category: '中画幅', price: 29999, originalPrice: 44999, condition: '9成新', conditionScore: 90, shutterCount: 15000, useYears: 2, seller: { id: 3, name: '商业摄影师', avatar: '💼', rating: 4.7, sales: 22 }, description: '富士中画幅，1亿像素，商业棚拍利器。', images: [cameraImages[2], cameraImages[9]], tags: ['中画幅', '1亿像素'], createdAt: '2026-04-08' },
  { id: 17, name: 'Nikon Z6II', brand: 'Nikon', model: 'Z6II', category: '微单', price: 8499, originalPrice: 13999, condition: '8成新', conditionScore: 82, shutterCount: 52000, useYears: 3, seller: { id: 4, name: '摄影学生', avatar: '🎓', rating: 4.5, sales: 5 }, description: '尼康Z6II，视频照片全能，学生党性价比之选。', images: [cameraImages[7], cameraImages[8]], tags: ['性价比', '学生党'], createdAt: '2026-04-05' },
  { id: 18, name: 'DJI RS3 Pro', brand: 'DJI', model: 'RS3 Pro', category: '稳定器', price: 2999, originalPrice: 4499, condition: '9成新', conditionScore: 90, shutterCount: 0, useYears: 1, seller: { id: 9, name: '婚礼摄影师', avatar: '💒', rating: 4.8, sales: 14 }, description: '大疆RS3 Pro，自动轴锁，跟焦马达，专业影视稳定。', images: [cameraImages[4], cameraImages[6]], tags: ['稳定器', '专业'], createdAt: '2026-04-02' },
  { id: 19, name: 'Canon RP', brand: 'Canon', model: 'RP', category: '微单', price: 5999, originalPrice: 9999, condition: '8成新', conditionScore: 78, shutterCount: 68000, useYears: 4, seller: { id: 8, name: '退休爱好者', avatar: '👴', rating: 4.4, sales: 6 }, description: '佳能全画幅入门机，轻便好上手，适合新手。', images: [cameraImages[5], cameraImages[9]], tags: ['入门', '全画幅'], createdAt: '2026-03-28' },
  { id: 20, name: 'Sony ZV-E1', brand: 'Sony', model: 'ZV-E1', category: 'Vlog相机', price: 11999, originalPrice: 16999, condition: '95新', conditionScore: 95, shutterCount: 5000, useYears: 0.5, seller: { id: 10, name: 'Vlog博主', avatar: '📱', rating: 4.9, sales: 3 }, description: '全画幅Vlog相机，AI芯片，自动构图，B站UP主神器。', images: [cameraImages[3], cameraImages[0]], tags: ['Vlog', 'AI构图'], createdAt: '2026-03-25' }
]

export const users = [
  { id: 1, username: '摄影师小王', phone: '13800000001', email: 'wang@camerahub.com', password: '123456', avatar: '👤', role: 'user' },
  { id: 2, username: '影视工作者', phone: '13800000002', email: 'film@camerahub.com', password: '123456', avatar: '👨‍💼', role: 'user' },
  { id: 3, username: '风光摄影师', phone: '13800000003', email: 'landscape@camerahub.com', password: '123456', avatar: '👩‍🎨', role: 'user' },
  { id: 4, username: '胶片爱好者', phone: '13800000004', email: 'filmfan@camerahub.com', password: '123456', avatar: '📷', role: 'user' },
  { id: 5, username: '商业摄影师', phone: '13800000005', email: 'studio@camerahub.com', password: '123456', avatar: '🎯', role: 'user' },
  { id: 6, username: '航拍达人', phone: '13800000006', email: 'drone@camerahub.com', password: '123456', avatar: '🚁', role: 'user' },
  { id: 7, username: '独立导演', phone: '13800000007', email: 'director@camerahub.com', password: '123456', avatar: '🎬', role: 'user' },
  { id: 8, username: '街拍达人', phone: '13800000008', email: 'street@camerahub.com', password: '123456', avatar: '📸', role: 'user' },
  { id: 9, username: '视频创作者', phone: '13800000009', email: 'video@camerahub.com', password: '123456', avatar: '🎥', role: 'user' },
  { id: 10, username: '管理员', phone: '13800000000', email: 'admin@camerahub.com', password: 'admin123', avatar: '🛡️', role: 'admin' }
]

export const orders = [
  { id: 1, userId: 1, deviceId: 1, deviceName: 'Sony A7M4', type: 'rental', days: 3, totalPrice: 897, deposit: 5000, status: '已完成', createdAt: '2026-05-01' },
  { id: 2, userId: 2, deviceId: 5, deviceName: 'Canon R6 II', type: 'rental', days: 5, totalPrice: 1745, deposit: 6000, status: '使用中', createdAt: '2026-06-01' },
  { id: 3, userId: 3, deviceId: 14, deviceName: 'DJI Pocket 3', type: 'rental', days: 7, totalPrice: 903, deposit: 2000, status: '已完成', createdAt: '2026-04-15' },
  { id: 4, userId: 1, deviceId: 8, deviceName: 'Nikon Z8', type: 'rental', days: 2, totalPrice: 858, deposit: 8000, status: '待取件', createdAt: '2026-06-08' },
  { id: 5, userId: 4, deviceId: 11, deviceName: 'Fuji XT5', type: 'rental', days: 3, totalPrice: 837, deposit: 4500, status: '已完成', createdAt: '2026-03-20' },
  { id: 6, userId: 5, deviceId: 2, deviceName: 'Sony A7R5', type: 'rental', days: 1, totalPrice: 399, deposit: 8000, status: '已取消', createdAt: '2026-05-10' },
  { id: 7, userId: 6, deviceId: 16, deviceName: 'DJI Mavic 3 Pro', type: 'rental', days: 3, totalPrice: 1197, deposit: 8000, status: '已完成', createdAt: '2026-04-22' },
  { id: 8, userId: 7, deviceId: 4, deviceName: 'Sony FX3', type: 'rental', days: 10, totalPrice: 4990, deposit: 10000, status: '使用中', createdAt: '2026-06-05' },
  { id: 9, userId: 8, deviceId: 13, deviceName: 'Fuji X100VI', type: 'rental', days: 2, totalPrice: 698, deposit: 6000, status: '已完成', createdAt: '2026-05-28' },
  { id: 10, userId: 9, deviceId: 17, deviceName: 'Panasonic S5IIX', type: 'rental', days: 5, totalPrice: 1395, deposit: 5000, status: '待取件', createdAt: '2026-06-09' },
  { id: 11, userId: 1, deviceId: 19, deviceName: 'Leica Q3', type: 'rental', days: 1, totalPrice: 599, deposit: 15000, status: '已完成', createdAt: '2026-02-14' },
  { id: 12, userId: 3, deviceId: 6, deviceName: 'Canon R5', type: 'rental', days: 3, totalPrice: 1347, deposit: 8000, status: '已完成', createdAt: '2026-03-08' },
  { id: 13, userId: 5, deviceId: 9, deviceName: 'Nikon Z6 III', type: 'rental', days: 4, totalPrice: 1316, deposit: 5500, status: '使用中', createdAt: '2026-06-07' },
  { id: 14, userId: 2, deviceId: 15, deviceName: 'DJI RS4', type: 'rental', days: 7, totalPrice: 693, deposit: 1500, status: '已完成', createdAt: '2026-04-01' },
  { id: 15, userId: 4, deviceId: 3, deviceName: 'Sony A7C2', type: 'rental', days: 5, totalPrice: 1245, deposit: 4500, status: '已完成', createdAt: '2026-05-15' },
  { id: 16, userId: 6, deviceId: 10, deviceName: 'Nikon Zf', type: 'rental', days: 3, totalPrice: 897, deposit: 5000, status: '已取消', createdAt: '2026-05-20' },
  { id: 17, userId: 7, deviceId: 7, deviceName: 'Canon R8', type: 'rental', days: 2, totalPrice: 558, deposit: 4500, status: '已完成', createdAt: '2026-03-25' },
  { id: 18, userId: 8, deviceId: 12, deviceName: 'Fuji XH2S', type: 'rental', days: 1, totalPrice: 329, deposit: 5500, status: '已完成', createdAt: '2026-04-18' },
  { id: 19, userId: 9, deviceId: 18, deviceName: 'Panasonic GH6', type: 'rental', days: 3, totalPrice: 747, deposit: 4500, status: '使用中', createdAt: '2026-06-06' },
  { id: 20, userId: 10, deviceId: 20, deviceName: 'Hasselblad X2D', type: 'rental', days: 1, totalPrice: 799, deposit: 25000, status: '已完成', createdAt: '2026-01-10' }
]

export const transactions = [
  { id: 1, buyerId: 1, sellerId: 2, itemId: 2, itemName: 'Canon R6', price: 9999, status: '已完成', createdAt: '2026-05-18' },
  { id: 2, buyerId: 3, sellerId: 5, itemId: 5, itemName: 'Sony A7R4', price: 11999, status: '已完成', createdAt: '2026-05-10' },
  { id: 3, buyerId: 4, sellerId: 8, itemId: 8, itemName: 'Fuji X100V', price: 8499, status: '交易中', createdAt: '2026-05-03' },
  { id: 4, buyerId: 6, sellerId: 7, itemId: 7, itemName: 'Canon R5C', price: 15999, status: '已完成', createdAt: '2026-05-05' },
  { id: 5, buyerId: 2, sellerId: 3, itemId: 3, itemName: 'Nikon Z7II', price: 12999, status: '已完成', createdAt: '2026-05-15' },
  { id: 6, buyerId: 9, sellerId: 6, itemId: 6, itemName: 'DJI Mavic 3', price: 7999, status: '已完成', createdAt: '2026-05-08' },
  { id: 7, buyerId: 5, sellerId: 9, itemId: 10, itemName: 'Sony FX30', price: 9999, status: '交易中', createdAt: '2026-04-25' },
  { id: 8, buyerId: 7, sellerId: 10, itemId: 11, itemName: 'Leica M11', price: 39999, status: '已完成', createdAt: '2026-04-20' },
  { id: 9, buyerId: 8, sellerId: 4, itemId: 4, itemName: 'Fuji XT4', price: 6999, status: '已完成', createdAt: '2026-05-12' },
  { id: 10, buyerId: 1, sellerId: 5, itemId: 15, itemName: 'Sony A1', price: 34999, status: '已完成', createdAt: '2026-04-10' }
]

export const heroSlides = [
  { image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&h=900&fit=crop', title: '租得放心，买得安心', subtitle: '专业相机租赁与二手保真交易平台', btn1: '立即租赁', btn1Link: '/rental', btn2: '浏览二手', btn2Link: '/secondhand' },
  { image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&h=900&fit=crop', title: 'AI智能检测，正品保障', subtitle: 'AI真伪检测 · 设备估值 · 智能推荐', btn1: 'AI检测中心', btn1Link: '/ai-detection', btn2: '了解更多', btn2Link: '/rental' },
  { image: 'https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?w=1920&h=900&fit=crop', title: '从入门到专业，一站配齐', subtitle: '20+品牌 · 100+设备 · 专业服务', btn1: '开始探索', btn1Link: '/rental', btn2: '发布闲置', btn2Link: '/publish' }
]

export const advantages = [
  { icon: '🛡️', title: '实名认证', desc: '所有用户实名认证，交易安全有保障' },
  { icon: '🔍', title: '官方检测', desc: '专业设备检测团队，品质层层把关' },
  { icon: '🤖', title: 'AI估值', desc: 'AI智能估值系统，价格公平透明' },
  { icon: '🔧', title: '售后保障', desc: '7天无理由退换，全程售后无忧' }
]
