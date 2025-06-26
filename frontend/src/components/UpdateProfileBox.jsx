import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, Download, User, Mail, Phone, FileText, Code } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    // Color definitions
    const colors = {
        background: "rgb(238, 245, 255)",
        secondary: "rgb(180, 212, 255)",
        accent: "rgb(134, 182, 246)",
        text: "rgb(23, 107, 135)"
    }

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(', ') || "",
        file: null
    })

    const handleInputChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.file) formData.append("file", input.file)

        try {
            setLoading(true)
            const res = await axios.post("http://localhost:3000/api/v1/user/profile/update", formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            })
            
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                setOpen(false)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed")
        } finally {
            setLoading(false)
        }
    }

    const skillsCount = input.skills.split(',').filter(s => s.trim()).length

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
            >
                <DialogContent 
                    className="rounded-lg max-w-md max-h-[90vh] overflow-y-auto"
                    style={{
                        backgroundColor: colors.background,
                        border: `2px solid ${colors.accent}`
                    }}
                >
                    <DialogHeader>
                        <DialogTitle className="text-xl" style={{ color: colors.text }}>
                            <User className="inline mr-2 h-5 w-5" />
                            Update Profile
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {['fullname', 'email', 'phoneNumber'].map((field) => (
                            <motion.div 
                                key={field}
                                whileHover={{ scale: 1.01 }}
                            >
                                <Label htmlFor={field} className="flex items-center gap-2 mb-1">
                                    {{
                                        fullname: <User className="h-4 w-4" />,
                                        email: <Mail className="h-4 w-4" />,
                                        phoneNumber: <Phone className="h-4 w-4" />
                                    }[field]}
                                    {field.replace(/([A-Z])/g, ' $1')}
                                </Label>
                                <Input
                                    id={field}
                                    name={field}
                                    value={input[field]}
                                    onChange={handleInputChange}
                                    className="rounded-lg"
                                    style={{ borderColor: colors.accent }}
                                />
                            </motion.div>
                        ))}

                        <motion.div whileHover={{ scale: 1.01 }}>
                            <Label htmlFor="bio" className="flex items-center gap-2 mb-1">
                                <FileText className="h-4 w-4" />
                                Professional Bio
                            </Label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded-lg border-2 resize-y"
                                style={{
                                    borderColor: colors.accent,
                                    minHeight: '100px'
                                }}
                            />
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.01 }}>
                            <Label htmlFor="skills" className="flex items-center gap-2 mb-1">
                                <Code className="h-4 w-4" />
                                Skills (comma separated)
                            </Label>
                            <div className="relative">
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={handleInputChange}
                                    className="rounded-lg pr-16"
                                    style={{ borderColor: colors.accent }}
                                />
                                <span 
                                    className="absolute right-3 top-2 text-sm"
                                    style={{ color: colors.text }}
                                >
                                    {skillsCount} skill{skillsCount !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.01 }}>
                            <Label className="flex items-center gap-2 mb-1">
                                <Download className="h-4 w-4" />
                                Resume (PDF only)
                            </Label>
                            <label 
                                className="flex items-center justify-center w-full p-4 rounded-lg border-2 border-dashed cursor-pointer"
                                style={{
                                    borderColor: colors.accent,
                                    backgroundColor: colors.secondary
                                }}
                            >
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <span className="text-sm" style={{ color: colors.text }}>
                                    {input.file?.name || "Click to upload"}
                                </span>
                            </label>
                        </motion.div>

                        <motion.div whileTap={{ scale: 0.98 }}>
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="w-full py-2 rounded-lg font-medium transition-colors"
                                style={{
                                    backgroundColor: colors.text,
                                    color: colors.background
                                }}
                            >
                                {loading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </motion.div>
                    </form>
                </DialogContent>
            </motion.div>
        </Dialog>
    )
}

export default UpdateProfileDialog