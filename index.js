local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

print("[TOPBAR+] 🟢 Script started")

-- ========== LOAD TOPBARPLUS ==========

local Icon = require(ReplicatedStorage:WaitForChild("Icon"))
print("[TOPBAR+] ✅ Icon module loaded")

local broadcastEvent = ReplicatedStorage:WaitForChild("BroadcastDonation")
local getDataFunc = ReplicatedStorage:WaitForChild("GetDonationData")

print("[TOPBAR+] ✅ Events ready")

-- ========== CREATE MAIN GUI ==========

local mainGui = Instance.new("ScreenGui")
mainGui.Name = "DonationGui"
mainGui.ResetOnSpawn = false
mainGui.Parent = playerGui

-- ========== NOTIFICATION (ATAS LAYAR) ==========

local notifFrame = Instance.new("Frame")
notifFrame.Name = "Notification"
notifFrame.Size = UDim2.new(0, 500, 0, 130)
notifFrame.Position = UDim2.new(0.5, -250, 0, 10)
notifFrame.BackgroundColor3 = Color3.fromRGB(40, 40, 50)
notifFrame.BorderSizePixel = 0
notifFrame.BackgroundTransparency = 1
notifFrame.Parent = mainGui

local notifCorner = Instance.new("UICorner")
notifCorner.CornerRadius = UDim.new(0, 12)
notifCorner.Parent = notifFrame

local notifStroke = Instance.new("UIStroke")
notifStroke.Color = Color3.fromRGB(255, 215, 0)
notifStroke.Thickness = 3
notifStroke.Transparency = 1
notifStroke.Parent = notifFrame

local progressBar = Instance.new("Frame")
progressBar.Size = UDim2.new(1, 0, 0, 4)
progressBar.Position = UDim2.new(0, 0, 1, -4)
progressBar.BackgroundColor3 = Color3.fromRGB(255, 215, 0)
progressBar.BorderSizePixel = 0
progressBar.BackgroundTransparency = 1
progressBar.Parent = notifFrame

local progressFill = Instance.new("Frame")
progressFill.Size = UDim2.new(1, 0, 1, 0)
progressFill.BackgroundColor3 = Color3.fromRGB(255, 215, 0)
progressFill.BorderSizePixel = 0
progressFill.BackgroundTransparency = 1
progressFill.Parent = progressBar

-- ========== AVATAR CONTAINER ==========

local avatarContainer = Instance.new("Frame")
avatarContainer.Name = "AvatarContainer"
avatarContainer.Size = UDim2.new(0, 90, 0, 90)
avatarContainer.Position = UDim2.new(0, 10, 0.5, -45)
avatarContainer.BackgroundColor3 = Color3.fromRGB(50, 50, 60)
avatarContainer.BorderSizePixel = 0
avatarContainer.BackgroundTransparency = 1
avatarContainer.Parent = notifFrame

local containerCorner = Instance.new("UICorner")
containerCorner.CornerRadius = UDim.new(0, 12)
containerCorner.Parent = avatarContainer

local containerStroke = Instance.new("UIStroke")
containerStroke.Color = Color3.fromRGB(255, 215, 0)
containerStroke.Thickness = 2
containerStroke.Transparency = 1
containerStroke.Parent = avatarContainer

local avatarImage = Instance.new("ImageLabel")
avatarImage.Name = "Image"
avatarImage.Size = UDim2.new(1, 0, 1, 0)
avatarImage.Position = UDim2.new(0, 0, 0, 0)
avatarImage.BackgroundTransparency = 1
avatarImage.BorderSizePixel = 0
avatarImage.ScaleType = Enum.ScaleType.Crop
avatarImage.Image = ""
avatarImage.Parent = avatarContainer

local imageCorner = Instance.new("UICorner")
imageCorner.CornerRadius = UDim.new(0, 12)
imageCorner.Parent = avatarImage

-- ========== TEXT LABELS ==========

local titleLabel = Instance.new("TextLabel")
titleLabel.Size = UDim2.new(1, -115, 0, 25)
titleLabel.Position = UDim2.new(0, 110, 0, 8)
titleLabel.BackgroundTransparency = 1
titleLabel.Text = "🎉 DONASI MASUK!"
titleLabel.TextColor3 = Color3.fromRGB(255, 255, 0)
titleLabel.TextSize = 16
titleLabel.Font = Enum.Font.GothamBold
titleLabel.TextTransparency = 1
titleLabel.Parent = notifFrame

local donorLabel = Instance.new("TextLabel")
donorLabel.Size = UDim2.new(1, -115, 0, 20)
donorLabel.Position = UDim2.new(0, 110, 0, 33)
donorLabel.BackgroundTransparency = 1
donorLabel.Text = "—"
donorLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
donorLabel.TextSize = 13
donorLabel.Font = Enum.Font.Gotham
donorLabel.TextXAlignment = Enum.TextXAlignment.Left
donorLabel.TextTransparency = 1
donorLabel.Parent = notifFrame

local amountLabel = Instance.new("TextLabel")
amountLabel.Size = UDim2.new(1, -115, 0, 20)
amountLabel.Position = UDim2.new(0, 110, 0, 53)
amountLabel.BackgroundTransparency = 1
amountLabel.Text = "—"
amountLabel.TextColor3 = Color3.fromRGB(255, 200, 0)
amountLabel.TextSize = 13
amountLabel.Font = Enum.Font.GothamBold
amountLabel.TextXAlignment = Enum.TextXAlignment.Left
amountLabel.TextTransparency = 1
amountLabel.Parent = notifFrame

local messageLabel = Instance.new("TextLabel")
messageLabel.Size = UDim2.new(1, -115, 0, 25)
messageLabel.Position = UDim2.new(0, 110, 0, 73)
messageLabel.BackgroundTransparency = 1
messageLabel.Text = "—"
messageLabel.TextColor3 = Color3.fromRGB(180, 220, 255)
messageLabel.TextSize = 11
messageLabel.Font = Enum.Font.Gotham
messageLabel.TextXAlignment = Enum.TextXAlignment.Left
messageLabel.TextYAlignment = Enum.TextYAlignment.Top
messageLabel.TextWrapped = true
messageLabel.TextTransparency = 1
messageLabel.Parent = notifFrame

print("[TOPBAR+] ✅ Notification created")

-- ========== CREATE LIST PANEL ==========

local listPanel = Instance.new("Frame")
listPanel.Name = "ListPanel"
listPanel.Size = UDim2.new(0, 420, 0, 550)
listPanel.Position = UDim2.new(1, -430, 0, 60)
listPanel.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
listPanel.BorderSizePixel = 0
listPanel.Visible = false
listPanel.Parent = mainGui

local listCorner = Instance.new("UICorner")
listCorner.CornerRadius = UDim.new(0, 12)
listCorner.Parent = listPanel

local listStroke = Instance.new("UIStroke")
listStroke.Color = Color3.fromRGB(255, 215, 0)
listStroke.Thickness = 2
listStroke.Parent = listPanel

local header = Instance.new("TextLabel")
header.Name = "Header"
header.Size = UDim2.new(1, 0, 0, 50)
header.BackgroundColor3 = Color3.fromRGB(50, 50, 60)
header.BorderSizePixel = 0
header.Text = "📊 DAFTAR DONATUR"
header.TextColor3 = Color3.fromRGB(255, 215, 0)
header.TextSize = 14
header.Font = Enum.Font.GothamBold
header.Parent = listPanel

local headerCorner = Instance.new("UICorner")
headerCorner.CornerRadius = UDim.new(0, 12)
headerCorner.Parent = header

local totalLabel = Instance.new("TextLabel")
totalLabel.Name = "TotalLabel"
totalLabel.Size = UDim2.new(1, -20, 0, 20)
totalLabel.Position = UDim2.new(0, 10, 0, 5)
totalLabel.BackgroundTransparency = 1
totalLabel.Text = "💰 TOTAL: Rp 0"
totalLabel.TextColor3 = Color3.fromRGB(255, 200, 0)
totalLabel.TextSize = 12
totalLabel.Font = Enum.Font.GothamBold
totalLabel.TextXAlignment = Enum.TextXAlignment.Left
totalLabel.Parent = header

local scrollFrame = Instance.new("ScrollingFrame")
scrollFrame.Name = "ScrollFrame"
scrollFrame.Size = UDim2.new(1, 0, 1, -50)
scrollFrame.Position = UDim2.new(0, 0, 0, 50)
scrollFrame.BackgroundTransparency = 1
scrollFrame.BorderSizePixel = 0
scrollFrame.ScrollBarThickness = 8
scrollFrame.ScrollBarImageColor3 = Color3.fromRGB(255, 215, 0)
scrollFrame.Parent = listPanel

local listLayout = Instance.new("UIListLayout")
listLayout.Padding = UDim.new(0, 8)
listLayout.Parent = scrollFrame

print("[TOPBAR+] ✅ List panel created")

-- ========== CREATE TOPBARPLUS ICON ==========

local donationIcon = Icon.new()
donationIcon:setName("DonationIcon")
donationIcon:setImage("rbxassetid://6034047591")
donationIcon:setLabel("Donasi")
donationIcon:setOrder(1)
donationIcon:align("Center")
donationIcon:bindToggleItem(listPanel)

print("[TOPBAR+] ✅ TopbarPlus icon created")

-- ========== CACHE DATA ==========

local cachedDonators = {}

-- ========== FUNCTIONS ==========

local function PlaySound()
    local sound = Instance.new("Sound")
    sound.Volume = 0.5
    sound.SoundId = "rbxassetid://6857657306"
    sound.Parent = playerGui
    sound:Play()
    game:GetService("Debris"):AddItem(sound, 2)
end

local function ShowNotification(donor, amount, message)
    print("[TOPBAR+] 🔔 Notification for:", donor)
    
    PlaySound()
    
    donorLabel.Text = "💚 " .. donor .. " berdonasi!"
    amountLabel.Text = "💰 Rp " .. tostring(amount)
    messageLabel.Text = message and message ~= "" and ("📝 " .. message) or "📝 (tanpa pesan)"
    progressFill.Size = UDim2.new(1, 0, 1, 0)
    
    if avatarImage then
        avatarImage.Image = ""
    end
    
    -- Try load avatar
    spawn(function()
        local success, userId = pcall(function()
            return Players:GetUserIdFromNameAsync(donor)
        end)
        
        if success and userId then
            print("[TOPBAR+] ✅ User found:", userId)
            local avatarUrl = "https://www.roblox.com/headshot-thumbnail/image?userId=" .. tostring(userId) .. "&width=420&height=420&format=png"
            
            if avatarImage and avatarContainer then
                avatarImage.Image = avatarUrl
                avatarContainer.BackgroundTransparency = 0.3
                containerStroke.Transparency = 0
            end
        else
            print("[TOPBAR+] ⚠️ User not found")
            if avatarContainer then
                avatarContainer.BackgroundTransparency = 0.5
                containerStroke.Transparency = 0.5
            end
        end
    end)
    
    -- Animation
    local tweenIn = TweenInfo.new(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
    
    TweenService:Create(notifFrame, tweenIn, {BackgroundTransparency = 0}):Play()
    TweenService:Create(notifStroke, tweenIn, {Transparency = 0}):Play()
    TweenService:Create(avatarContainer, tweenIn, {BackgroundTransparency = 0.3}):Play()
    TweenService:Create(titleLabel, tweenIn, {TextTransparency = 0}):Play()
    TweenService:Create(donorLabel, tweenIn, {TextTransparency = 0}):Play()
    TweenService:Create(amountLabel, tweenIn, {TextTransparency = 0}):Play()
    TweenService:Create(messageLabel, tweenIn, {TextTransparency = 0}):Play()
    TweenService:Create(progressBar, tweenIn, {BackgroundTransparency = 0}):Play()
    TweenService:Create(progressFill, tweenIn, {BackgroundTransparency = 0}):Play()
    
    TweenService:Create(progressFill, TweenInfo.new(5, Enum.EasingStyle.Linear), {Size = UDim2.new(0, 0, 1, 0)}):Play()
    
    wait(5)
    
    local tweenOut = TweenInfo.new(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.In)
    
    TweenService:Create(notifFrame, tweenOut, {BackgroundTransparency = 1}):Play()
    TweenService:Create(notifStroke, tweenOut, {Transparency = 1}):Play()
    TweenService:Create(avatarContainer, tweenOut, {BackgroundTransparency = 1}):Play()
    TweenService:Create(containerStroke, tweenOut, {Transparency = 1}):Play()
    TweenService:Create(titleLabel, tweenOut, {TextTransparency = 1}):Play()
    TweenService:Create(donorLabel, tweenOut, {TextTransparency = 1}):Play()
    TweenService:Create(amountLabel, tweenOut, {TextTransparency = 1}):Play()
    TweenService:Create(messageLabel, tweenOut, {TextTransparency = 1}):Play()
    TweenService:Create(progressBar, tweenOut, {BackgroundTransparency = 1}):Play()
    TweenService:Create(progressFill, tweenOut, {BackgroundTransparency = 1}):Play()
    
    wait(0.3)
    
    if avatarImage then
        avatarImage.Image = ""
    end
    
    donorLabel.Text = "—"
    amountLabel.Text = "—"
    messageLabel.Text = "—"
end

local function UpdateList(donationList)
    print("[TOPBAR+] 📋 Updating list:", #donationList)
    
    for _, item in pairs(scrollFrame:GetChildren()) do
        if item.Name == "DonationItem" then
            item:Destroy()
        end
    end
    
    -- Sort dari tertinggi
    local sortedList = {}
    for _, d in ipairs(donationList) do
        table.insert(sortedList, d)
    end
    
    table.sort(sortedList, function(a, b)
        return (a.totalAmount or 0) > (b.totalAmount or 0)
    end)
    
    local grandTotal = 0
    
    for idx, donator in ipairs(sortedList) do
        grandTotal = grandTotal + donator.totalAmount
        
        local item = Instance.new("Frame")
        item.Name = "DonationItem"
        item.Size = UDim2.new(1, -10, 0, 85)
        item.BackgroundColor3 = Color3.fromRGB(45, 45, 55)
        item.BorderSizePixel = 0
        item.Parent = scrollFrame
        
        local itemCorner = Instance.new("UICorner")
        itemCorner.CornerRadius = UDim.new(0, 8)
        itemCorner.Parent = item
        
        local badge = Instance.new("TextLabel")
        badge.Size = UDim2.new(0, 40, 0, 40)
        badge.Position = UDim2.new(0, 8, 0.5, -20)
        badge.BackgroundColor3 = Color3.fromRGB(255, 215, 0)
        badge.BorderSizePixel = 0
        badge.Text = tostring(idx)
        badge.TextColor3 = Color3.fromRGB(40, 40, 50)
        badge.TextSize = 18
        badge.Font = Enum.Font.GothamBold
        badge.Parent = item
        
        local badgeCorner = Instance.new("UICorner")
        badgeCorner.CornerRadius = UDim.new(1, 0)
        badgeCorner.Parent = badge
        
        local name = Instance.new("TextLabel")
        name.Size = UDim2.new(0, 360, 0, 18)
        name.Position = UDim2.new(0, 55, 0, 8)
        name.BackgroundTransparency = 1
        name.Text = "💚 " .. donator.name
        name.TextColor3 = Color3.fromRGB(255, 255, 255)
        name.TextSize = 14
        name.Font = Enum.Font.GothamBold
        name.TextXAlignment = Enum.TextXAlignment.Left
        name.Parent = item
        
        local totalAmount = Instance.new("TextLabel")
        totalAmount.Size = UDim2.new(0, 360, 0, 16)
        totalAmount.Position = UDim2.new(0, 55, 0, 26)
        totalAmount.BackgroundTransparency = 1
        totalAmount.Text = "💰 Total: Rp " .. tostring(donator.totalAmount)
        totalAmount.TextColor3 = Color3.fromRGB(255, 200, 0)
        totalAmount.TextSize = 13
        totalAmount.Font = Enum.Font.GothamBold
        totalAmount.TextXAlignment = Enum.TextXAlignment.Left
        totalAmount.Parent = item
        
        local countLabel = Instance.new("TextLabel")
        countLabel.Size = UDim2.new(0, 360, 0, 14)
        countLabel.Position = UDim2.new(0, 55, 0, 42)
        countLabel.BackgroundTransparency = 1
        countLabel.Text = "📊 Donasi " .. tostring(donator.count) .. "x"
        countLabel.TextColor3 = Color3.fromRGB(150, 200, 255)
        countLabel.TextSize = 11
        countLabel.Font = Enum.Font.Gotham
        countLabel.TextXAlignment = Enum.TextXAlignment.Left
        countLabel.Parent = item
        
        local lastDate = Instance.new("TextLabel")
        lastDate.Size = UDim2.new(0, 360, 0, 14)
        lastDate.Position = UDim2.new(0, 55, 0, 56)
        lastDate.BackgroundTransparency = 1
        lastDate.Text = "📅 " .. donator.lastDate
        lastDate.TextColor3 = Color3.fromRGB(160, 160, 160)
        lastDate.TextSize = 10
        lastDate.Font = Enum.Font.Gotham
        lastDate.TextXAlignment = Enum.TextXAlignment.Left
        lastDate.Parent = item
        
        local lastMsg = Instance.new("TextLabel")
        lastMsg.Size = UDim2.new(0, 360, 0, 14)
        lastMsg.Position = UDim2.new(0, 55, 0, 70)
        lastMsg.BackgroundTransparency = 1
        lastMsg.Text = "📝 " .. (donator.lastMessage ~= "" and donator.lastMessage or "(tanpa pesan)")
        lastMsg.TextColor3 = Color3.fromRGB(120, 120, 120)
        lastMsg.TextSize = 9
        lastMsg.Font = Enum.Font.Gotham
        lastMsg.TextXAlignment = Enum.TextXAlignment.Left
        lastMsg.TextTruncate = Enum.TextTruncate.AtEnd
        lastMsg.Parent = item
    end
    
    scrollFrame.CanvasSize = UDim2.new(0, 0, 0, listLayout.AbsoluteContentSize.Y + 10)
    totalLabel.Text = "💰 TOTAL: Rp " .. tostring(grandTotal)
end

-- ========== ICON EVENTS ==========

donationIcon.selected:Connect(function()
    print("[TOPBAR+] 🎯 Icon clicked")
    
    if #cachedDonators > 0 then
        UpdateList(cachedDonators)
    else
        local success, data = pcall(function()
            return getDataFunc:InvokeServer()
        end)
        if success and data then
            cachedDonators = data
            UpdateList(data)
        end
    end
end)

-- ========== BROADCAST EVENTS ==========

broadcastEvent.OnClientEvent:Connect(function(donor, amount, msg)
    if donor == "UPDATE_LIST" then
        print("[TOPBAR+] 📋 List update")
        cachedDonators = amount
        UpdateList(amount)
    else
        print("[TOPBAR+] 🔔 Notification")
        ShowNotification(donor, amount, msg or "")
    end
end)

print("[TOPBAR+] 🟢 READY!")

wait(1)
local success, data = pcall(function()
    return getDataFunc:InvokeServer()
end)
if success and data then
    cachedDonators = data
    print("[TOPBAR+] ✅ Initial data cached:", #data)
end
